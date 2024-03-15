-- Table: location_info
-- Description: Stores environmental characteristics of geographical locations, including pollution, crime, and natural disaster levels.
CREATE TABLE location_info (
  location_id SERIAL PRIMARY KEY, -- Unique identifier for each location
  longitude DECIMAL(9,6), -- Longitude coordinate for the location
  latitude DECIMAL(9,6), -- Latitude coordinate for the location
  crime_index INT, -- Crime index representing the crime level at the location
  pollution_index INT, -- Pollution index representing the pollution level at the location
  disaster_index INT -- Disaster index representing the potential for natural disasters at the location
);

-- Table: users
-- Description: Contains information about users, including whether they are a landlord or a renter.
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, -- Unique identifier for each user
  role VARCHAR(50), -- Role of the user (landlord or renter)
  username VARCHAR(50), -- Username for the user account
  password_hash VARCHAR(255), -- Hash of the user's password for security
  email VARCHAR(255), -- Email address of the user
  CONSTRAINT unique_role_username UNIQUE (role, username) -- Ensures that the combination of role and username is unique
);

-- Table: housing_info
-- Description: Holds information about housing listings posted by landlords.
CREATE TABLE housing_info (
  housing_id SERIAL PRIMARY KEY, -- Unique identifier for each housing listing
  title VARCHAR(255), -- Title of the housing listing
  description TEXT, -- Description of the housing listing
  photo_url VARCHAR(255), -- URL to a photo of the housing
  publisher_id INT REFERENCES users(user_id), -- References the user_id of the landlord who published the listing
  address TEXT, -- Address of the housing
  price DECIMAL(10,2), -- Price of the housing listing
  num_bedrooms INT, -- Number of bedrooms in the housing
  num_bathrooms INT, -- Number of bathrooms in the housing
  size_sqft INT, -- Size of the housing in square feet
  latitude DECIMAL(9,6), -- Latitude coordinate of the housing location, calculated from the address
  longitude DECIMAL(9,6) -- Longitude coordinate of the housing location, calculated from the address
);

-- Table: reviews
-- Description: Stores reviews made by renters about either housing or landlords.
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY, -- Unique identifier for each review
  author_id INT REFERENCES users(user_id), -- References the user_id of the author of the review
  target_id INT, -- Identifier of the review target (either housing_id or user_id)
  target_type VARCHAR(50), -- Type of the target (either 'housing' or 'user')
  content TEXT, -- Text content of the review
  rating INT, -- Numerical rating given in the review
  CONSTRAINT chk_target_type CHECK (target_type IN ('housing', 'user')) -- Ensures target_type is either 'housing' or 'user'
);
