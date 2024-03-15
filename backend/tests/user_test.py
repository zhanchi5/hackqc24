import requests
import time

session = requests.Session()

def test_users():
    # test registration
    url = "http://127.0.0.1:5000/api/users"
    timestamp = time.time()
    data = {
        f"username": "test_user{}".format(timestamp),
        "password": "test_password",
        "email": "test@example.com",
        "role": "landlord"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201
    assert response.json()['status'] == 'success'

    data = {
        f"username": "test_user{}".format(timestamp),
        "password": "test_password",
        "email": "test@example.com",
        "role": "renter"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201
    assert response.json()['status'] == 'success'

    data = {
        f"username": "test_user{}".format(timestamp),
        "password": "test_password",
        "email": "test@example.com",
        "role": "renter"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 409
    assert response.json()['status'] == 'failed'

    data = {
        "username": "test_user_fail",
        "password": "test_password",
        "email": "test@example.com",
        "role": "aaa"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 400
    assert response.json()['status'] == 'failed'
    
    # test login
    url = 'http://localhost:5000/api/users/login'
    data = {
        f"username": "test_user{}".format(timestamp),
        "role": "landlord",
        "password": "test_password"
    }
    response = session.post(url, json=data)

    json_response = response.json()
    assert json_response['status'] == 'success'
    user_id = json_response['user_id']

    # test get single user
    url = f'http://localhost:5000/api/users/{user_id}'.format(user_id)
    response = session.get(url)
    json_response = response.json()
    assert json_response['status'] == 'success'
    assert json_response['user_id'] == user_id
    assert json_response['role'] == 'landlord'
    assert json_response['username'] == f"test_user{timestamp}".format(timestamp)

    url = f'http://localhost:5000/api/users/0'.format(user_id+1)
    response = session.get(url)
    json_response = response.json()
    assert json_response['status'] == 'failed'
    assert json_response['message'] == 'Unauthorized'

    # test logout
    url = 'http://localhost:5000/api/users/logout'
    response = session.post(url)
    json_response = response.json()
    assert json_response['status'] == 'success'
    url = f'http://localhost:5000/api/users/0'.format(user_id)
    response = session.get(url)
    json_response = response.json()
    assert json_response['status'] == 'failed'
    assert json_response['message'] == 'Unauthorized'



if __name__ == "__main__":
    test_users()
    print("All tests passed!")
