from flask import request, jsonify, session
from db.models import db, Review, HousingInfo, User
from . import reviews_bp

@reviews_bp.route('/housing', methods=['POST'])
def post_housing_review():
    author_id = session.get('user_id')
    if not author_id:
        return jsonify({'status': 'failed', 'message': 'Unauthorized'}), 401
    
    # note: we don't verify if the user is a renter or not for simplicity

    data = request.json
    target_id = data.get('target_id')
    content = data.get('content')
    rating = data.get('rating')
    target_type = data.get('target_type')

    if not rating:
        return jsonify({'status': 'failed', 'message': 'Missing rating'}), 400
    
    # Check if content is 'housing'
    if target_type != 'housing':
        return jsonify({'status': 'failed', 'message': 'Invalid target type'}), 400

    # Check if target_id exists in the HousingInfo table
    housing = HousingInfo.query.filter_by(housing_id=target_id).first()
    if not housing:
        return jsonify({'status': 'failed', 'message': 'Housing ID not found'}), 404

    # Assuming target_id exists, create and add the review to the database
    try:
        new_review = Review(author_id=author_id, target_id=target_id, content=content, rating=rating, target_type=target_type)
        db.session.add(new_review)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status': 'failed', 'message': 'Database error occurred'}), 500

    return jsonify({'status': 'success', 'message': 'Review posted successfully'}), 201

@reviews_bp.route('/landlord', methods=['POST'])
def post_landlord_review():
    author_id = session.get('user_id')
    if not author_id:
        return jsonify({'status': 'failed', 'message': 'Unauthorized'}), 401
    
    # note: we don't verify if the user is a renter or not for simplicity
    
    data = request.json
    target_id = data.get('target_id')
    content = data.get('content')
    rating = data.get('rating')
    target_type = data.get('target_type')

    if not rating:
        return jsonify({'status': 'failed', 'message': 'Missing rating'}), 400
    
    # Check if content is 'landlord'
    if target_type != 'user':
        return jsonify({'status': 'failed', 'message': 'Invalid target type'}), 400

    # Check if target_id exists in the HousingInfo table
    user = User.query.filter_by(user_id=target_id).first()
    if not user:
        return jsonify({'status': 'failed', 'message': 'User ID not found'}), 404

    # Assuming target_id exists, create and add the review to the database
    try:
        new_review = Review(author_id=author_id, target_id=target_id, content=content, rating=rating, target_type=target_type)
        db.session.add(new_review)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status': 'failed', 'message': 'Database error occurred'}), 500

    return jsonify({'status': 'success', 'message': 'Review posted successfully'}), 201

@reviews_bp.route('/landlord/<int:landlord_id>', methods=['GET'])
def get_landlord_reviews(landlord_id):
    # Query the database for reviews of the specified landlord
    reviews = Review.query.filter_by(target_id=landlord_id, target_type="user").all()

    # Serialize the reviews
    serialized_reviews = []
    for review in reviews:
        serialized_review = {
            'review_id': review.review_id,
            'author_id': review.author_id, #no username for simplicity and anonymity
            'content': review.content,
            'rating': review.rating
        }
        serialized_reviews.append(serialized_review)

    return jsonify({"status": "success", "reviews": serialized_reviews}), 200

@reviews_bp.route('/housing/<int:housing_id>', methods=['GET'])
def get_housing_reviews(housing_id):
    # Query the database for reviews of the specified landlord
    reviews = Review.query.filter_by(target_id=housing_id, target_type="housing").all()

    # Serialize the reviews
    serialized_reviews = []
    for review in reviews:
        serialized_review = {
            'review_id': review.review_id,
            'author_id': review.author_id, #no username for simplicity and anonymity
            'content': review.content,
            'rating': review.rating
        }
        serialized_reviews.append(serialized_review)

    return jsonify({"status": "success", "reviews": serialized_reviews}), 200
