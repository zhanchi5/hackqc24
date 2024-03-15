import requests
import time

session = requests.Session()

def test_reviews():
    landlord_id, username = setup_user()
    housing_id = setup_housing()

    # Post housing review
    url = 'http://localhost:5000/api/reviews/housing'
    data = {
        "author_id": landlord_id,
        "target_id": housing_id,
        "content": "Great place to live!",
        "rating": 5,
        "target_type": "housing"
        }

    response = session.post(url, json=data)
    assert response.status_code == 201
    response_data = response.json()
    assert response_data['status'] == 'success'

    # Post landlord review
    url = 'http://localhost:5000/api/reviews/landlord'
    data = {
        "author_id": landlord_id,
        "target_id": landlord_id, # self-rating, but it's okay for testing
        "content": "Great landlord!",
        "rating": 5,
        "target_type": "user" # should be 'user' not 'landlord'
        }
    response = session.post(url, json=data)
    assert response.status_code == 201
    response_data = response.json()
    assert response_data['status'] == 'success'

    # Get housing reviews
    url = f'http://localhost:5000/api/reviews/housing/{housing_id}'.format(housing_id)
    response = session.get(url)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data['status'] == 'success'
    assert len(response_data['reviews']) == 1
    assert response_data['reviews'][0]['content'] == "Great place to live!"

    # Get landlord reviews
    url = f'http://localhost:5000/api/reviews/landlord/{landlord_id}'.format(landlord_id)
    response = session.get(url)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data['status'] == 'success'
    assert len(response_data['reviews']) == 1
    assert response_data['reviews'][0]['content'] == "Great landlord!"


def setup_user(role="landlord"):
    url = "http://127.0.0.1:5000/api/users"
    timestamp = time.time()
    data = {
        f"username": "test_user{}".format(timestamp),
        "password": "test_password",
        "email": "test@example.com",
        "role": role
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201
    assert response.json()['status'] == 'success'
    
    url = 'http://localhost:5000/api/users/login'
    data = {
        f"username": "test_user{}".format(timestamp),
        "role": role,
        "password": "test_password"
    }
    response = session.post(url, json=data)

    json_response = response.json()
    assert json_response['status'] == 'success'
    user_id = json_response['user_id']

    return user_id, f"test_user{timestamp}"

def setup_housing():
    url = 'http://localhost:5000/api/housing/'
    data = {
        'title': 'Test Housing',
        'description': 'This is a test housing listing',
        'photo_url': 'https://example.com/test.jpg',
        'address': 'Baie-de-la-Bouteille, Matawinie, Lanaudière, Québec, Canada',
        'price': 1000,
        'num_bedrooms': 3,
        'num_bathrooms': 2,
        'size_sqft': 1500
    }
    response = session.post(url, json=data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data['status'] == 'success'
    assert response_data['message'] == 'Housing posted successfully'
    housing_id = response_data.get('housing_id')
    assert housing_id is not None
    assert isinstance(housing_id, int)
    return housing_id

if __name__ == "__main__":
    test_reviews()
    print("All tests passed!")
