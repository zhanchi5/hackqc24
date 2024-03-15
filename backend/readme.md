# QLTRS Backend API Documentation

## Overview

This document describes the backend design and functionality of the rental app. The application provides features such as user authentication (login/registration), housing listing, housing filtering, housing posting, house reviews, and landlord reviews.

## Technology Stack

- Language: Python
- Web Framework: Flask
- Database: PostgreSQL
- ORM: SQLAlchemy

## How to use it
```bash
# the requirements.txt needs improvement
pip install -r requirements.txt```
```

```python
python app.py
```

## How to test it
1. run the docker for the database
```bash
docker run --name qltrs -e POSTGRES_DB=qltrs -e POSTGRES_USER=qltrs -e POSTGRES_PASSWORD=qltrs -p 15432:5432 -d caowerdocker/db_qltrs:latest
# better to confirm the container is running
```

2. run the app
```bash
python app.py
```

3. test the app
```bash
python tests/users_test.py # for example
```

## API Design

### [Completed] Welcome page

- Method: GET
- URL: `/api/`, `/api`, `/api/home`

**Request**

- Method: GET

**Response**
- Status Code: 200 OK
- Content-Type: application/json

- Body:
```json
{
  "status": "success",
  "message": "Welcome to the QLTRS API, please login or register to unlock the full potential of the API."
}
```

OR if the user is logged in:

```json
{
  "status": "success",
  "message": "Welcome to the QLTRS API, you are logged in as user: {username}"
}
```

### User

#### [Completed] Register User / Create User

- **URL:** `/api/users`
- **Method:** POST
- **Request Body:** 
All the fields are required!
  ```json
  {
      "username": "user123",
      "password": "password123",
      "email": "user123@example.com",
      "role": "landlord" 
  }
  ```
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Registration successful!"
  }
  ```
  Or:
  ```json
  {
      "status": "failed",
      "message": "User already exists. Please Log in."
  }
  ```

#### [Completed] User Login

- **URL:** `/api/users/login`
- **Method:** POST
- **Request Body:**
All the fields are required!
  ```json
  {
      "username": "user123",
      "password": "password123",
      "role": "landlord"
  }
  ```
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Login successful!"
  }
  ```
  Or:
  ```json
  {
      "status": "failed",
      "message": "Invalid username or password"
  }
  ```

#### [Completed] User Logout

- **URL:** `/api/users/logout`
- **Method:** POST
- **Functionality:** Logout the user by clearing the session data.
- **Response:**
  - **Success:**
    ```json
    {
        "status": "success",
        "message": "Logout successful"
    }
    ```
    HTTP Status Code: 200
  - **Error (Unauthorized):**
    ```json
    {
        "status": "failed",
        "message": "Not logged in"
    }
    ```
    HTTP Status Code: 401


#### Get All Users (For Admin only, optional for implementation, since it is not our core function)

- **HTTP Method:** GET
- **URI:** /users
- **Functionality:** Retrieve a list of all users.
- **Query Parameters:**
  - `role` (optional): Filter users by role (e.g., landlord or renter).
  - `username` (optional): Filter users by username.
- **Sample Response:**
  ```json
  [
      {"user_id": 1, "username": "user1", "email": "user1@example.com", "role": "landlord"},
      {"user_id": 2, "username": "user2", "email": "user2@example.com", "role": "renter"}
  ]
  ```
- **Example Request:**
  ```
  GET /users?role=landlord&username=user1
  ```
- **Notes:**
  - Use `role` parameter to filter users by role (e.g., landlord or renter).
  - Use `username` parameter to filter users by username.


#### [Completed] Get Single User （For user self）

   - HTTP Method: GET
   - URI: /users/{user_id}
   - Functionality: Retrieve detailed information about a specific user.
   - Sample Response: (passwords are hashed, so they are not shown here.)

     ```json
     {"status": "success", "user_id": 1, "username": "user1", "email": "user1@example.com", "role": "landlord"}
     ```


#### Update User (For user self, optional for implementation, since it is not our core function)

   - HTTP Method: PUT
   - URI: /users/{user_id}
   - Functionality: Update information about a specific user.
   - Request Body: (at least one field is required, users can also update their password, but hashed)

     ```json
     {
         "email": "updated_email@example.com"
     }
     ```
   - Sample Response:

     ```json
     {"user_id": 1, "username": "user1", "email": "updated_email@example.com", "role": "landlord"}
     ```

#### Delete User (For user self, optional for implementation, since it is not our core function)

   - HTTP Method: DELETE
   - URI: /users/{user_id}
   - Functionality: Delete a specific user.
   - Sample Response: HTTP Status Code 204 No Content


### Housing Information

#### [Completed, But Need Test and Review]Get Housing List (Core Functionality)
This API is used to get a list of housing listings. 
It can be filtered by:
  1. price range
  2. landlord ID
  3. ideal address and acceptable distance
  4. ratings range (from 0 to 5)
  5. crime index weight (from 0 to 10, default 5)
  6. pollution index weight (from 0 to 10, default 5)
  7. disaster index weight (from 0 to 10, default 5)
  8. min and max number of bedrooms 
  9. min and max number of bathrooms
  10. min and max square footage
  11. price weight (from 0 to 10, default 5)
  12. bedrooms weight (from 0 to 10, default 5)
  13. bathrooms weight (from 0 to 10, default 5)
  

All of the above filters are optional.

- **URL:** `/api/housing`
- **Method:** GET
- **Query Parameters:**
  - `min_price` (optional): Minimum price of the housing.
  - `max_price` (optional): Maximum price of the housing.
  - `address` (required): Address of the housing.
  - `distance` (optional): Distance acceptable from the specified address, with a default of 5 kilometers.
  - `publisher_id` (optional): ID of the publisher/landlord.
  - `min_rating` (optional): Minimum rating of the housing.
  - `min_landlord_rating` (optional): Minimum landlord rating of the housing.
  - `crime_weight` (optional): Weight for crime index.
  - `pollution_weight` (optional): Weight for pollution index.
  - `disaster_weight` (optional): Weight for disaster index.
  - `price_weight` (optional): Weight for price.
  - `bedrooms_weight` (optional): Weight for number of bedrooms.
  - `bathrooms_weight` (optional): Weight for number of bathrooms.
  - `square_footage_weight` (optional): Weight for square footage.
  - `min_bedrooms` (optional): Minimum number of bedrooms.
  - `max_bedrooms` (optional): Maximum number of bedrooms.
  - `min_bathrooms` (optional): Minimum number of bathrooms.
  - `max_bathrooms` (optional): Maximum number of bathrooms.
  - `min_square_footage` (optional): Minimum square footage of the housing.
  - `max_square_footage` (optional): Maximum square footage of the housing.
- **Response:**
- **Note(IMPORTANT！！)**
  -  1. The responses are ranked by the weighted (and normalized) sum of the environmental indices, bedrooms, bathrooms, square footage, and price. If the user inputs the filter on the latter three, the houses which are not in the range will not be returned. But those factors will still affect the ranking.
  -  2. The default weights are 5
  ```json
  [
      {
          "housing_id": 1,
          "title": "Beautiful Apartment",
          "description": "Spacious apartment with great view",
          "photo_url": "https://example.com/photo.jpg",
          "publisher_id": 2,
          "address": "123 Main St",
          "price": "1200.00",
          "rating": 4.5,           <!-- calculated instead of fetched from the db, may for debug only  -->
          "landlord_rating": 4.5,    <!-- calculated instead of fetched from the db, may for debug only  -->
          "crime_index": 13,          <!-- calculated instead of fetched from the db, may for debug only  -->
          "pollution_index": 22,          <!-- calculated instead of fetched from the db, may for debug only  -->
          "disaster_index": 41,          <!-- calculated instead of fetched from the db, may for debug only  -->
          "num_bedrooms": 2,
          "num_bathrooms": 1,
          "square_footage": 200
      },
      {
          "housing_id": 2,
          "title": "Cozy Studio",
          "description": "Studio apartment in downtown area",
          "photo_url": "https://example.com/photo2.jpg",
          "publisher_id": 3,
          "address": "456 Elm St",
          "price": "800.00",
          "rating": 4.5,           <!-- calculated instead of fetched from the db, may for debug only  -->
          "landlord_rating": 4.5,    <!-- calculated instead of fetched from the db, may for debug only  -->
          "crime_index": 30,          <!-- calculated instead of fetched from the db, may for debug only  -->
          "pollution_index": 10,          <!-- calculated instead of fetched from the db, may for debug only  -->
          "disaster_index": 20,          <!-- calculated instead of fetched from the db, may for debug only  -->
          "num_bedrooms": 3,
          "num_bathrooms":2,
          "square_footage": 500
      }
  ]
  ```
- **Example Request:**
  ```
  GET /api/housing?min_price=800&max_price=1200&publisher_id=2&min_rating=4&min_landlord_rating=4&crime_weight=1&pollution_weight=9&price_weight&num_bedrooms_weight&num_bedrooms_weight&disaster_weight=5&address=123%20Main%20St&distance=5&min_bedrooms=2&max_bedrooms=3&min_bathrooms=1&max_bathrooms=2&min_square_footage=200&max_square_footage=500
  ```
- **Notes:**
  - Use `min_price` and `max_price` to filter housing listings within a price range.
  - Use `publisher_id` to filter housing listings published by a specific landlord.
  - Use `min_rating` to filter housing listings with a minimum rating.
  - User `min_landlord_rating` to filter housing listings with a minimum landlord rating.
  - Use `crime_weight`, `pollution_weight`, and `disaster_weight` to adjust the importance of environmental factors in the housing location.
  - User `price_weight`, `bedrooms_weight`, `bathrooms_weight`, and `square_footage_weight` to adjust the importance of the price, bedrooms, bathrooms, and square footage in the housing listing.
  - Use `address` to filter housing listings by a specific address.
  - Use `distance` along with `address` to filter housing listings within a certain distance from a specified address.
  - Use `min_bedrooms` and `max_bedrooms` to filter housing listings by the number of bedrooms.
  - Use `min_bathrooms` and `max_bathrooms` to filter housing listings by the number of bathrooms.
  - Use `min_square_footage` and `max_square_footage` to filter housing listings by the square footage.

#### [Completed] Get Specific Housing Information

- **URL:** `/api/housing/<housing_id>`
- **Method:** GET
- **Response:**
  ```json
  {
      "status": "success",
      "housing_id": 1,
      "title": "Beautiful Apartment",
      "description": "Spacious apartment with great view",
      "photo_url": "https://example.com/photo.jpg",
      "publisher_id": 2,
      "landlord": "John Doe",
      "address": "123 Main St",
      "price": "1200.00",
      "num_bedrooms": 2,
      "num_bathrooms": 1,
      "square_footage": 200
  }
  ```
  ```json
  {
      "status": "failed",
      "message": "Housing ID not found"
  }
  ```

#### [Completed] Post New Housing Information

- **URL:** `/api/housing`
- **Method:** POST
- **Request Body:**
  ```json
  {
      "title": "New Apartment",
      "description": "Brand new apartment with modern amenities",
      "photo_url": "https://example.com/photo3.jpg",
      "address": "789 Oak St",
      "price": "1500.00",
      "num_bedrooms": 2,
      "num_bathrooms": 1,
      "square_footage": 300
  }
  ```
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Housing posted successfully",
      "housing_id": 3 <!-- the id of the new housing -->
  }
  ```
  ```json
  {
      "status": "failed",
      "message": "any error message"
  }
  ```

#### Update Housing Information (optional for implementation, since it is not our core function)

- **URL:** `/api/housing/{housing_id}`
- **Method:** PUT
- **Request Body:**
  ```json
  {
      "title": "Updated Apartment",
      "description": "Renovated apartment with upgraded features",
      "photo_url": "https://example.com/photo_updated.jpg",
      "address": "789 Oak St",
      "price": "1600.00"
  }
  ```
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Housing information updated successfully"
  }
  ```
  ```json
  {
      "status": "failed",
      "message": "Failed to update housing information. Housing ID not found"
  }
  ```

#### Delete Housing Information (optional for implementation, since it is not our core function)

- **URL:** `/api/housing/{housing_id}`
- **Method:** DELETE
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Housing information deleted successfully"
  }
  ```
  ```json
  {
      "status": "failed",
      "message": "Failed to delete housing information. Housing ID not found"
  }
  ```

### Reviews Management

#### [Completed] Post Housing Review

- **URL:** `/api/review/housing`
- **Method:** POST
- **Request Body:**
Only content is optional, all other fields are required!
  ```json
  {
      "target_id": 1,
      "content": "Great place to live!",
      "rating": 5,
      "target_type": "housing"
  }
  ```
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Review posted successfully"
  }
  ```
  ```json
  {
      "status": "failed",
      "message": "Housing ID not found" <!-- or any other error message -->
  }
  ```

#### [Completed] Post Landlord Review
Only content is optional, all other fields are required!
- **URL:** `/api/review/landlord`
- **Method:** POST
- **Request Body:**
  ```json
  {
      "target_id": 2,
      "content": "Responsive and helpful landlord",
      "rating": 4,
      "target_type": "user" <!-- not landlord -->
  }
  ```
- **Response:**
  ```json
  {
      "status": "success",
      "message": "Review posted successfully"
  }
  ```
  ```json
  {
      "status": "failed",
      "message": "User ID not found" <!-- or any other error message -->
  }
  ```

#### [Completed] Get Landlord Reviews

- **URL:** `/api/reviews/landlord/{landlord_id}`
- **Method:** GET
- **Path Parameters:**
  - `landlord_id`: The ID of the landlord for whom reviews are requested.
- **Response:**
  ```json
  [
      {
          "review_id": 1,
          "author_id": 2,
          "content": "Responsive and helpful landlord",
          "rating": 4
      },
      {
          "review_id": 2,
          "author_id": 3,
          "content": "Great communication skills",
          "rating": 5
      }
  ]
  ```
- **Example Request:**
  ```
  GET /api/reviews/landlord/1
  ```
- **Notes:**
  - This endpoint retrieves all reviews for the specified landlord.
  - Each review object includes its unique ID (`review_id`), the ID of the author (`author_id`), the content of the review (`content`), and the rating (`rating`).

#### [Completed] Get Housing Reviews

- **URL:** `/api/reviews/housing/{housing_id}`
- **Method:** GET
- **Path Parameters:**
  - `housing_id`: The ID of the housing for which reviews are requested.
- **Response:**
  ```json
  [
      {
          "review_id": 1,
          "author_id": 2,
          "content": "Great place to live!",
          "rating": 5
      },
      {
          "review_id": 2,
          "author_id": 3,
          "content": "Good location and amenities",
          "rating": 4
      }
  ]
  ```
- **Example Request:**
  ```
  GET /api/reviews/housing/1
  ```
- **Notes:**
  - This endpoint retrieves all reviews for the specified housing.
  - Each review object includes its unique ID (`review_id`), the ID of the author (`author_id`), the content of the review (`content`), and the rating (`rating`).

### Environmental Information 

#### [Completed] Get Environmental Information for All Locations(May for frondend to show the map)

- **URL:** `/api/location_info`
- **Method:** GET
- **Query Parameters:**
  - `min_longitude` (optional): Minimum longitude coordinate of the location.
  - `max_longitude` (optional): Maximum longitude coordinate of the location.
  - `min_latitude` (optional): Minimum latitude coordinate of the location.
  - `max_latitude` (optional): Maximum latitude coordinate of the location.
  - `min_crime_index` (optional): Minimum crime index of the location.
  - `max_crime_index` (optional): Maximum crime index of the location.
  - `min_pollution_index` (optional): Minimum pollution index of the location.
  - `max_pollution_index` (optional): Maximum pollution index of the location.
  - `min_disaster_index` (optional): Minimum disaster index of the location.
  - `max_disaster_index` (optional): Maximum disaster index of the location.
- **Response:**
  ```json
  [
      {
          "location_id": 1,
          "longitude": -73.9833,
          "latitude": 40.7488,
          "crime_index": 3,
          "pollution_index": 2,
          "disaster_index": 1
      },
      {
          "location_id": 2,
          "longitude": -73.9654,
          "latitude": 40.7829,
          "crime_index": 2,
          "pollution_index": 1,
          "disaster_index": 0
      }
  ]
  ```

#### [Completed] Get Environmental Information for Specific Location

- **URL:** `/api/location_info/<location_id>`
- **Method:** GET
- **Response:**
  ```json
  {
      "location_id": 1,
      "longitude": -73.9833,
      "latitude": 40.7488,
      "crime_index": 3,
      "pollution_index": 2,
      "disaster_index": 1
  }
  ```



## User Story

### As a Renter
#### Register
First I want to register to the app in order to unlock the full potential of the app, such as commenting and rating the housing and landlord.

- I want to register to the app with my username, password, email, and role (renter), and the app will redirect me to the login page after successful registration.

#### Login
After registration, I want to login to the app to access the full functionality of the app.

- I want to login to the app with my username and password, and the app will redirect me to the home page after successful login.

#### View Housing Listings
After login, I want to view the housing listings to find a place to live.

- I want to view the housing listings with the following filters:
  - price range
  - landlord ID
  - ideal address and acceptable distance
  - ratings range (from 0 to 5)
  - crime index weight (from 0 to 10, default 5)
  - pollution index weight (from 0 to 10, default 5)
  - disaster index weight (from 0 to 10, default 5)
  - min and max number of bedrooms 
  - min and max number of bathrooms
  - min and max square footage
  - price weight (from 0 to 10, default 5)
  - bedrooms weight (from 0 to 10, default 5)
  - bathrooms weight (from 0 to 10, default 5)

#### View Housing Details
After finding a housing listing, I want to view the details of the housing.

- I want to view the details of the housing, such as the title, description, photo, publisher ID, address, price, number of bedrooms, number of bathrooms, and square footage.

#### Post Housing Review
After viewing the housing details, I want to post a review for the housing.

- I want to post a review for the housing with the following fields:
  - target ID
  - content
  - rating
  - target type (housing)

#### Post Landlord Review
After viewing the housing details, I want to post a review for the landlord.

- I want to post a review for the landlord with the following fields:
  - target ID
  - content
  - rating
  - target type (user)

#### View Housing Reviews
After posting a review, I want to view the reviews for the housing, mine as well as others'.

#### View Landlord Reviews
After posting a review, I want to view the reviews for the landlord, mine as well as others'.
                                                                                                                              
#### Logout
After using the app, I want to logout to clear the session data.

### As a Landlord
#### Register
First I want to register to the app in order to unlock the full potential of the app, such as commenting and rating the housing and landlord.

- I want to register to the app with my username, password, email, and role (renter), and the app will redirect me to the login page after successful registration.

#### Login
After registration, I want to login to the app to access the full functionality of the app.

- I want to login to the app with my username and password, and the app will redirect me to the home page after successful login.

#### Post Housing Information
After login, I want to post the housing information to find a tenant.

#### View Housing Reviews
After posting a review, I want to view the reviews for the housing, mine as well as others'.

#### View Landlord Reviews
After posting a review, I want to view the reviews for the landlord, mine as well as others'.
                                                                                                                              
#### Logout
After using the app, I want to logout to clear the session data.