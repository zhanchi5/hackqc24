from flask import request, jsonify, session
from db.models import db, User
from sqlalchemy.exc import IntegrityError
from . import users_bp
from werkzeug.security import check_password_hash, generate_password_hash

@users_bp.route('/', methods=['POST'], strict_slashes=False)
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')

    if not username or not password or not email or not role or role not in ["landlord", "renter"]:
        return jsonify({'status': 'failed', 'message': 'Missing or having error in required fields'}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(username=username, role=role).first()
    if existing_user:
        return jsonify({'status': 'failed', 'message': 'User already exists. Please log in.'}), 409

    try:
        new_user = User(role=role, username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Registration successful!'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'status': 'failed', 'message': 'Database error occurred'}), 500


@users_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Missing required fields'})

    user = User.query.filter_by(username=username, role=role).first()
    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.user_id
        session['username'] = user.username
        return jsonify({'status': 'success', 'message': 'Login successful!', 
                        'user_id': session['user_id'], 
                        'username': session['username']}) # for test
    else:
        return jsonify({'status': 'error', 'message': 'Invalid username or password'})


@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    if session.get('user_id') is None or session['user_id'] != user_id:
        return jsonify({'status': 'failed', 'message': 'Unauthorized'}), 401
    user = User.query.get(user_id)
    if user:
        return jsonify({'status': 'success', 'user_id': user.user_id, 'username': user.username, 
                        'email': user.email, 'role': user.role }), 200
    else:
        return jsonify({'status': 'failed', 'message': 'User not found'}), 404
    
from flask import session, jsonify

@users_bp.route('/logout', methods=['POST'])
def logout():
    if 'user_id' in session:
        session.pop('user_id')
        return jsonify({'status': 'success', 'message': 'Logout successful'}), 200
    else:
        return jsonify({'status': 'failed', 'message': 'Not logged in'}), 401
