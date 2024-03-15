from flask import request, jsonify, session
from db.models import db, LocationInfo
from . import locations_bp

@locations_bp.route('/', methods=['GET'], strict_slashes=False)
def get_locations_info():
    # Extract query parameters
    min_longitude = request.args.get('min_longitude')
    max_longitude = request.args.get('max_longitude')
    min_latitude = request.args.get('min_latitude')
    max_latitude = request.args.get('max_latitude')
    min_crime_index = request.args.get('min_crime_index')
    max_crime_index = request.args.get('max_crime_index')
    min_pollution_index = request.args.get('min_pollution_index')
    max_pollution_index = request.args.get('max_pollution_index')
    min_disaster_index = request.args.get('min_disaster_index')
    max_disaster_index = request.args.get('max_disaster_index')
    limit = request.args.get('limit')

    # Build query filters based on provided parameters
    filters = []
    if min_longitude:
        filters.append(LocationInfo.longitude >= float(min_longitude))
    if max_longitude:
        filters.append(LocationInfo.longitude <= float(max_longitude))
    if min_latitude:
        filters.append(LocationInfo.latitude >= float(min_latitude))
    if max_latitude:
        filters.append(LocationInfo.latitude <= float(max_latitude))
    if min_crime_index:
        filters.append(LocationInfo.crime_index >= int(min_crime_index))
    if max_crime_index:
        filters.append(LocationInfo.crime_index <= int(max_crime_index))
    if min_pollution_index:
        filters.append(LocationInfo.pollution_index >= int(min_pollution_index))
    if max_pollution_index:
        filters.append(LocationInfo.pollution_index <= int(max_pollution_index))
    if min_disaster_index:
        filters.append(LocationInfo.disaster_index >= int(min_disaster_index))
    if max_disaster_index:
        filters.append(LocationInfo.disaster_index <= int(max_disaster_index))

    # Execute the query with applied filters
    if filters:
        locations = LocationInfo.query.filter(*filters).limit(limit).all()
    else:
        locations = LocationInfo.query.limit(limit).all()


    # Execute the query with applied filters
    query = LocationInfo.query
    if filters:
        query = query.filter(db.and_(*filters))
    if limit:
        query = query.limit(int(limit))

    locations = query.all()

    # Serialize the results
    location_info_list = []
    for location in locations:
        location_info = {
            'location_id': location.location_id,
            'longitude': float(location.longitude),
            'latitude': float(location.latitude),
            'crime_index': location.crime_index,
            'pollution_index': location.pollution_index,
            'disaster_index': location.disaster_index
        }
        location_info_list.append(location_info)

    return jsonify({"status": "success", "locations": location_info_list}), 200

@locations_bp.route('/<int:location_id>', methods=['GET'])
def get_location_info(location_id):
    # Query the database for the location information
    location = LocationInfo.query.get(location_id)

    # Check if the location information exists
    if location:
        # Serialize the location information
        location_info = {
            "status": "success",
            "location_id": location.location_id,
            "longitude": location.longitude,
            "latitude": location.latitude,
            "crime_index": location.crime_index,
            "pollution_index": location.pollution_index,
            "disaster_index": location.disaster_index
        }
        return jsonify(location_info), 200
    else:
        return jsonify({'status': 'failed', 'message': 'Location information not found'}), 404
    