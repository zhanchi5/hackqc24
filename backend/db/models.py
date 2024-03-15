from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(255))
    email = db.Column(db.String(255))

    def __init__(self, role, username, password, email):
        self.role = role
        self.username = username
        self.password_hash = generate_password_hash(password)
        self.email = email

class HousingInfo(db.Model):
    __tablename__ = 'housing_info'
    housing_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    photo_url = db.Column(db.String(255))
    publisher_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    address = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2))
    num_bedrooms = db.Column(db.Integer)
    num_bathrooms = db.Column(db.Integer)
    size_sqft = db.Column(db.Integer)
    longitude = db.Column(db.DECIMAL(precision=9, scale=6))
    latitude = db.Column(db.DECIMAL(precision=9, scale=6)) 
    
    @property
    def score(self):
        return self._score
    
    @score.setter
    def score(self, value):
        self._score = value

    @property
    def crime_index(self):
        return self._crime_index
    
    @crime_index.setter
    def crime_index(self, value):
        self._crime_index = value

    @property
    def pollution_index(self):
        return self._pollution_index
    
    @pollution_index.setter
    def pollution_index(self, value):
        self._pollution_index = value

    @property
    def disaster_index(self):
        return self._disaster_index

    @disaster_index.setter    
    def disaster_index(self, value):
        self._disaster_index = value

    def __init__(self, title, description, photo_url, publisher_id, address, 
                 price, num_bedrooms, num_bathrooms, size_sqft, longitude, latitude):
        self.title = title
        self.description = description
        self.photo_url = photo_url
        self.publisher_id = publisher_id
        self.address = address
        self.price = price
        self.num_bedrooms = num_bedrooms
        self.num_bathrooms = num_bathrooms
        self.size_sqft = size_sqft
        self.longitude = longitude
        self.latitude = latitude

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    target_id = db.Column(db.Integer)
    target_type = db.Column(db.String(50))
    content = db.Column(db.Text)
    rating = db.Column(db.Integer)

    def __init__(self, author_id, target_id, target_type, content, rating):
        self.author_id = author_id
        self.target_id = target_id
        self.target_type = target_type
        self.content = content
        self.rating = rating
    
class LocationInfo(db.Model):
    __tablename__ = 'location_info'
    
    location_id = db.Column(db.Integer, primary_key=True)
    longitude = db.Column(db.DECIMAL(precision=9, scale=6))
    latitude = db.Column(db.DECIMAL(precision=9, scale=6))
    crime_index = db.Column(db.Integer)
    pollution_index = db.Column(db.Integer)
    disaster_index = db.Column(db.Integer)

    def __init__(self, longitude, latitude, crime_index, pollution_index, disaster_index):
        self.longitude = longitude
        self.latitude = latitude
        self.crime_index = crime_index
        self.pollution_index = pollution_index
        self.disaster_index = disaster_index
