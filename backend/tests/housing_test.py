import requests
import time

session = requests.Session()

def test_housing():
    landlord_id, username = setup_user()

    # Post housing
    url = 'http://localhost:5000/api/housing/'
    data = {
        'title': 'Test Housing',
        'description': 'This is a test housing listing',
        'photo_url': 'https://example.com/test.jpg',
        'address': "Baie-de-la-Bouteille, Matawinie, Lanaudière, Québec, Canada", # center of our dataset, see utils/address.py
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

    # Get housing
    url = f'http://localhost:5000/api/housing/{housing_id}'.format(housing_id)
    response = session.get(url)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data['status'] == 'success'
    assert response_data['title'] == 'Test Housing'
    assert response_data['publisher_id'] == landlord_id
    assert response_data['landlord'] == username


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

if __name__ == "__main__":
    test_housing()
    print("All tests passed!")
