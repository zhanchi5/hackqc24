from flask import Blueprint, jsonify, session, request
from db.models import db, HousingInfo, User, Review, LocationInfo  
from utils.address import test_coordinates_validity, address_to_coordinates, coordinates_range_given_center
from . import housing_bp

DEFAULT_DISTANCE = 5 #TODO: needs review
latitude_delta_for_searching_location_info = 0.05 #TODO: needs review, very arbitrary
longitude_delta_for_searching_location_info = 0.05 #TODO: needs review, very arbitrary
#TODO(Comments from Wei): to have appropriate values of deltas, this can be a very interesting question,
# First and foremost, it is highly likely that at the exact coordinates where the house stands,
# (probably have several number of digits after the decimal point), 
# the crime, pollution, and disaster indexes are not available in location_info table.
# In this situation, we need to have a range of coordinates to search for the location_info.
# How to determine the range? I think we should utilize the characteristics of the data itself.
# The basic idea is to leverage the first or second derivative of the indexes near the location.
# It is intuitive, if the indexes change rapidly, then we need to have a smaller range to search for the location_info.
# If the indexes change slowly, then we can have a larger range to search for the location_info.
# It might be done in data processing and analysis stage, in the jupyter notebook.
# Or! It might be modeled into a machine learning problem. Namely, we have some coordinates and their indexes, and the 
# task is to predict the indexes of an arbitrary coordinates within the range of the given coordinates.

@housing_bp.route('/', methods=['GET'], strict_slashes=False) #TODO: Core function, please review it and improve it and test it
def get_housing_list():
    """
    1. **Parameter Extraction and Validation**:
    - Extract parameters like `min_price`, `max_price`, `address`, `distance`, and `publisher_id` from the request.
    - Validate `min_price` and `max_price` to ensure they are integers.
    - Validate `distance` to ensure it's an integer, or use a default distance if not provided.

    2. **Address to Coordinates Conversion**:
    - Convert the address to latitude and longitude using the `address_to_coordinates` function.
    - Return an error response if the address is invalid.

    3. **Calculate Latitude and Longitude Range**:
    - Calculate the range of latitude and longitude based on the given address and distance using the `coordinates_range_given_center` function.

    4. **Validate Landlord ID**:
    - Validate whether `publisher_id` is an integer and corresponds to a user with the role of a landlord.

    5. **Get and Validate Ratings**:
    - Get and validate `min_rating` and `min_landlord_rating` to ensure they are integers.

    6. **Weight Validation**:
    - Get and validate the weight parameters for various indices, ensuring they are integers within a specified range.

    7. **Get and Validate Housing Parameters**:
    - Get and validate parameters such as `min_bedrooms`, `max_bedrooms`, `min_bathrooms`, `max_bathrooms`, `min_square_footage`, and `max_square_footage`, ensuring they are all integers.

    8. **Normalize Price and Room Counts**:
    - Get the minimum and maximum values for price, bedrooms, bathrooms, and square footage.
    - Normalize price, bedrooms, bathrooms, and square footage to a range from 0 to 100.

    9. **Build Filtering Conditions**:
    - Construct filtering conditions based on the parameters, including price, latitude and longitude range, bedrooms, and square footage.

    10. **Execute Query**:
        - Execute a query based on the constructed filtering conditions to retrieve a list of housing information that meets the criteria.

    11. **Handle Ratings**:
        - Calculate the average ratings for housing and landlords, and filter the housing list based on the ratings. 

    12. **Handle Housing Scores**:
        - Calculate and handle the scores of the housing based on weighted factors, including indices and parameters.

    13. **Sorting**:
        - Sort the list of housing based on their scores, with higher-scoring housing appearing first.

    14. **Return Results**:
        - Convert the housing information into JSON format and return it to the frontend.
    """
    


    # Extract query parameters and validate them
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')

    # Validate if min_price and max_price are integers
    if min_price is not None:
        try:
            min_price = int(min_price)
        except ValueError:
            return jsonify({'status': 'failed', 'message': 'min_price must be an integer'}), 400

    if max_price is not None:
        try:
            max_price = int(max_price)
        except ValueError:
            return jsonify({'status': 'failed', 'message': 'min_price must be an integer'}), 400


    address = request.args.get('address')
    distance = request.args.get('distance')

    min_latitude, max_latitude, min_longitude, max_longitude = None, None, None, None
    if address is not None:
        # Validate if distance is an integer
        if distance is not None:
            try:
                distance = int(distance)
            except ValueError:
                distance = DEFAULT_DISTANCE

        # Get the coordinates of the address
        latitude, longitude = address_to_coordinates(address)
        if latitude is None or longitude is None:
            return jsonify({'status': 'failed', 'message': 'Invalid address'}), 400
        
        min_latitude, max_latitude, min_longitude, max_longitude = coordinates_range_given_center(latitude, longitude, distance)

    publisher_id = request.args.get('publisher_id')
    if publisher_id is not None:
        try:
            publisher_id = int(publisher_id)
        except ValueError:
            return jsonify({'status': 'failed', 'message': 'publisher_id must be an integer'}), 400
    user = User.query.filter_by(user_id=publisher_id).first()
    if publisher_id is not None and (user is None or user.role != 'landlord'):
        return jsonify({'status': 'failed', 'message': 'landlord does not exist'}), 400

    min_rating = request.args.get('min_rating')
    min_landlord_rating = request.args.get('min_landlord_rating')
    if min_rating is not None:
        try:
            min_rating = int(min_rating)
        except ValueError:
            return jsonify({'status': 'failed', 'message': 'min_rating must be a int'}), 400
    if min_landlord_rating is not None:
        try:
            min_landlord_rating = int(min_landlord_rating)
        except ValueError:
            return jsonify({'status': 'failed', 'message': 'min_landlord_rating must be a int'}), 400

    # Those weights are ranged from 0 to 10
    crime_weight = request.args.get('crime_weight', 5)
    pollution_weight = request.args.get('pollution_weight', 5)
    disaster_weight = request.args.get('disaster_weight', 5)
    price_weight = request.args.get('price_weight', 5)
    bedrooms_weight = request.args.get('bedrooms_weight', 5)
    bathrooms_weight = request.args.get('bathrooms_weight', 5)
    square_footage_weight = request.args.get('square_footage_weight', 5)
    # Validate integer weights
    if not all(validate_integer_weight(weight) for weight in [crime_weight, pollution_weight, disaster_weight,
                                                          price_weight, bedrooms_weight, bathrooms_weight,
                                                          square_footage_weight]):
        return jsonify({'status': 'error', 'message': 'Invalid weight value. Weight must be an integer between 0 and 10.'}), 400

    min_bedrooms = request.args.get('min_bedrooms')
    max_bedrooms = request.args.get('max_bedrooms')
    min_bathrooms = request.args.get('min_bathrooms')
    max_bathrooms = request.args.get('max_bathrooms')
    min_square_footage = request.args.get('min_square_footage')
    max_square_footage = request.args.get('max_square_footage')
    # Validate integer parameters
    cand_parameters = [min_bedrooms, max_bedrooms, min_bathrooms, max_bathrooms, min_square_footage, max_square_footage]
    integer_parameters = [param for param in cand_parameters if param is not None]
    if not all(validate_integer(param) for param in integer_parameters):
        return jsonify({'status': 'error', 'message': 'Invalid parameter value. Parameters must be integers.'}), 400

    # Now normalize the filters of price, num_bedrooms, num_bathrooms, and num_square_footage to be in the range of 0 to 100
    # The normalization formula is: (value - min_value) / (max_value - min_value) * 100
    result = db.session.query(
    db.func.min(HousingInfo.price),
    db.func.max(HousingInfo.price),
    db.func.min(HousingInfo.num_bedrooms),
    db.func.max(HousingInfo.num_bedrooms),
    db.func.min(HousingInfo.num_bathrooms),
    db.func.max(HousingInfo.num_bathrooms),
    db.func.min(HousingInfo.size_sqft),
    db.func.max(HousingInfo.size_sqft)).one()

    result = [0 if x is None else x for x in result]

    min_price_db, max_price_db, \
    min_bedrooms_db, max_bedrooms_db, \
    min_bathrooms_db, max_bathrooms_db, \
    min_square_footage_db, max_square_footage_db = result


    diff_price = max(float(max_price_db - min_price_db),1) # transfer to float for division
    diff_bedrooms = max(float(max_bedrooms_db - min_bedrooms_db),1)
    diff_bathrooms = max(float(max_bathrooms_db - min_bathrooms_db),1)
    diff_square_footage = max(float(max_square_footage_db - min_square_footage_db),1)

    # Construct the query with filters
    filters = []

    if min_price is not None:
        filters.append(HousingInfo.price >= min_price)
    if max_price is not None:
        filters.append(HousingInfo.price <= max_price)
    if min_latitude is not None:
        filters.append(HousingInfo.latitude >= min_latitude)
    if max_latitude is not None:
        filters.append(HousingInfo.latitude <= max_latitude)
    if min_longitude is not None:
        filters.append(HousingInfo.longitude >= min_longitude)
    if max_longitude is not None:
        filters.append(HousingInfo.longitude <= max_longitude)
    if min_bedrooms is not None:
        filters.append(HousingInfo.num_bedrooms >= min_bedrooms)
    if max_bedrooms is not None:
        filters.append(HousingInfo.num_bedrooms <= max_bedrooms)
    if min_bathrooms is not None:
        filters.append(HousingInfo.num_bathrooms >= min_bathrooms)
    if max_bathrooms is not None:
        filters.append(HousingInfo.num_bathrooms <= max_bathrooms)
    if min_square_footage is not None:
        filters.append(HousingInfo.size_sqft >= min_square_footage)
    if max_square_footage is not None:
        filters.append(HousingInfo.size_sqft <= max_square_footage)

    query = HousingInfo.query

    if filters:
        query = query.filter(and_(*filters))

    housing_info_list = query.all()

    # We still have several things to do:
    # 1. deal with rating, housing's and landlord's
    # 2. normalize the weights 
    # 3. relate housing with indices in location_info
    # 4. calculate the score and sort the list accordingly


    # 1. deal with rating, housing's and landlord's
    housing_ids = [housing.housing_id for housing in housing_info_list]
    publisher_ids = set([housing.publisher_id for housing in housing_info_list])
    # 1.1 construct a dict and calculate the average rating of the housing
    housing_reviews = Review.query.filter(db.and_(Review.target_id.in_(housing_ids), Review.target_type == "housing")).all()
    housing_ratings = {}
    for review in housing_reviews:
        if review.target_id in housing_ratings:
            housing_ratings[review.target_id].append(review.rating)
        else:
            housing_ratings[review.target_id] = [review.rating]
    for housing_id in housing_ratings:
        housing_ratings[housing_id] = sum(housing_ratings[housing_id]) / len(housing_ratings[housing_id])
    # give those housing without rating a chance to show up
    for housing_id in housing_ids:
        if housing_id not in housing_ratings:
            housing_ratings[housing_id] = 0
        
    # 1.2 construct a dict and calculate the average rating of the landlord
    landlord_reviews = Review.query.filter(db.and_(Review.target_id.in_(publisher_ids), Review.target_type == "user")).all()
    landlord_ratings = {}
    for review in landlord_reviews:
        if review.target_id in landlord_ratings:
            landlord_ratings[review.target_id].append(review.rating)
        else:
            landlord_ratings[review.target_id] = [review.rating]
    for landlord_id in landlord_ratings:
        landlord_ratings[landlord_id] = sum(landlord_ratings[landlord_id]) / len(landlord_ratings[landlord_id])
    # give those landlords without rating a chance to show up
    for landlord_id in publisher_ids:
        if landlord_id not in landlord_ratings:
            housing_ratings[housing_id] = 0
    
    # 1.3 filter according to the rating
    if min_rating is not None:
        housing_info_list = [housing for housing in housing_info_list if housing_ratings[housing.housing_id] >= min_rating]
    if min_landlord_rating is not None:
        housing_info_list = [housing for housing in housing_info_list if landlord_ratings[housing.publisher_id] >= min_landlord_rating]

    # 2. normalize the num_bedrooms, num_bathrooms, and size_sqft
    for housing in housing_info_list:
        housing.num_bedrooms = (housing.num_bedrooms - min_bedrooms_db) / diff_bedrooms * 100
        housing.num_bathrooms = (housing.num_bathrooms - min_bathrooms_db) / diff_bathrooms * 100
        housing.size_sqft = (housing.size_sqft - min_square_footage_db) / diff_square_footage * 100
        housing.price = (housing.price - min_price_db) / diff_price * 100

    # 3. relate housing with indices in location_info
    # TODO: potential performance issue! worth consider store them in db!
    for housing in housing_info_list:
        location_info = LocationInfo.query.filter(
            LocationInfo.latitude >= float(housing.latitude) + latitude_delta_for_searching_location_info,
            LocationInfo.latitude <= float(housing.latitude) - latitude_delta_for_searching_location_info,
            LocationInfo.longitude <= float(housing.longitude) + longitude_delta_for_searching_location_info,
            LocationInfo.longitude <= float(housing.longitude) - longitude_delta_for_searching_location_info).first()
        if location_info:
            housing.crime_index = location_info.crime_index
            housing.pollution_index = location_info.pollution_index
            housing.disaster_index = location_info.disaster_index
        else:
            housing.crime_index = 100
            housing.pollution_index = 100
            housing.disaster_index = 100
        
    
    # 4. calculate the score and sort the list accordingly
    for housing in housing_info_list:
        housing.score = (float(crime_weight * housing.crime_index) +
                 float(pollution_weight * housing.pollution_index) +
                 float(disaster_weight * housing.disaster_index) +
                 float(price_weight * housing.price) +
                 float(bedrooms_weight * (100-housing.num_bedrooms)) + # 100 - x to make the lower the better!
                 float(bathrooms_weight * (100-housing.num_bathrooms)) +
                 float(square_footage_weight * (100-housing.size_sqft)))

    #TODO: confirm with Leilei
    #The lower the indexes, the better the housing is
    housing_info_list.sort(key=lambda x: x.score)

    housing_json = [{
            'id': housing.housing_id, 
            'title': housing.title, 
            'description': housing.description,
            'photo_url': housing.photo_url,
            'address': housing.address,
            'price': str(housing.price),
            'num_bedrooms': housing.num_bedrooms,
            'num_bathrooms': housing.num_bathrooms,
            'size_sqft': housing.size_sqft,
            'rating': housing_ratings[housing.housing_id],
            'landlord_rating': landlord_ratings.get(housing.publisher_id,0), #TODO: debug!
            'landlord_id': housing.publisher_id,
            'score': housing.score
            } for housing in housing_info_list]
    return jsonify(housing_json)

@housing_bp.route('/', methods=['POST'])
def post_housing():
    if 'user_id' not in session:
        return jsonify({'status': 'error', 'message': 'Please log in to post housing'})

    user = User.query.filter_by(user_id=session['user_id']).first()
    if user is None or user.role != 'landlord':
        return jsonify({'status': 'error', 'message': 'User not qualified to post housing'})
    
    data = request.json
    title = data.get('title')
    description = data.get('description')
    photo_url = data.get('photo_url')
    address = data.get('address')
    price = data.get('price')
    num_bedrooms = data.get('num_bedrooms')
    num_bathrooms = data.get('num_bathrooms')
    size_sqft = data.get('size_sqft')

    if not title or not description or not photo_url or not address or not price or not num_bedrooms or not num_bathrooms or not size_sqft:
        return jsonify({'status': 'failed', 'message': 'Missing required fields'}), 400

    # Check address validity
    latitude, longitude = address_to_coordinates(address)
    print(latitude, longitude)
    if not test_coordinates_validity(latitude, longitude):
        return jsonify({'status': 'failed', 'message': 'Invalid address'}), 400

    # Check data types
    try:
        price = float(price)
        num_bedrooms = int(num_bedrooms)
        num_bathrooms = int(num_bathrooms)
        size_sqft = int(size_sqft)
    except ValueError:
        return jsonify({'status': 'failed', 'message': 'Invalid data types for price, num_bedrooms, num_bathrooms, or size_sqft'}), 400

    # check the address to see if it has an appropriate range!
    new_housing = HousingInfo(title=title, description=description, photo_url=photo_url,
                              publisher_id=session['user_id'], address=address, price=price,
                              num_bedrooms=num_bedrooms, num_bathrooms=num_bathrooms, 
                              size_sqft=size_sqft, longitude=longitude, latitude=latitude)
    
    try:
        db.session.add(new_housing)
        db.session.commit()
    except Exception as e:
        return jsonify({'status': 'failed', 'message': str(e)})

    return jsonify({'status': 'success', 'message': 'Housing posted successfully', 'housing_id': new_housing.housing_id})

@housing_bp.route('/<int:housing_id>', methods=['GET'])
def get_housing_info(housing_id):
    # Query the database for the housing information
    housing_info = db.session.query(HousingInfo, User.username)\
        .filter(HousingInfo.housing_id == housing_id)\
        .join(User, HousingInfo.publisher_id == User.user_id).first()

    # Check if the housing information exists
    if housing_info:
        housing, publisher_username = housing_info
        # Serialize the housing information
        housing_info_json = {
            "status": "success",
            'housing_id': housing.housing_id,
            'title': housing.title,
            'description': housing.description,
            'photo_url': housing.photo_url,
            'landlord': publisher_username,
            'publisher_id': housing.publisher_id,
            'address': housing.address,
            'price': str(housing.price)  # Convert Decimal to string for JSON serialization
        }
        return jsonify(housing_info_json), 200
    else:
        return jsonify({'status': 'failed', 'message': 'Housing information not found'}), 404

def validate_integer_weight(weight):
    try:
        weight = int(weight)
        if 0 <= weight <= 10:
            return True
        else:
            return False
    except ValueError:
        return False

def validate_integer(value):
    try:
        int_value = int(value)
        return True
    except ValueError:
        return False