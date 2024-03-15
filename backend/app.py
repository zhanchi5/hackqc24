import os
from flask import Flask, jsonify, session
from users.users import users_bp
from housing.housing import housing_bp
from reviews.reviews import reviews_bp
from locations.locations import locations_bp
from db.models import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'qltrs'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://qltrs:qltrs@localhost:15432/qltrs')

db.init_app(app)

app.register_blueprint(users_bp)
app.register_blueprint(housing_bp)
app.register_blueprint(reviews_bp)
app.register_blueprint(locations_bp)

# Welcome page route
@app.route('/api/')
@app.route('/api')
@app.route('/api/home')
def welcome():
    welcome_message = "Welcome to the QLTRS API, please login or register to unlock the full potential of the API."
    
    if 'username' in session: # Both username and user_id are stored in session
        welcome_message = "Welcome to the QLTRS API, you are logged in as user: " + session['username']
    return jsonify({"status": "success", "message": welcome_message}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

