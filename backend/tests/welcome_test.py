import requests
import time

session = requests.Session()

def test_welcome():
    # User not logged in
    url = 'http://localhost:5000/api/'
    response = session.get(url)
    assert response.status_code == 200
    assert response.json()['message'] == "Welcome to the QLTRS API, please login or register to unlock the full potential of the API."

    # User logged in
    landlord_id, username = setup_user()
    url = 'http://localhost:5000/api/'
    response = session.get(url)
    assert response.status_code == 200
    assert response.json()['message'] == "Welcome to the QLTRS API, you are logged in as user: " + username


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
    test_welcome()
    print("All tests passed!")
