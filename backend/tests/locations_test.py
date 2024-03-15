import requests
import random

# Stats on our actual data in db
min_longitude = -79.514495
max_longitude = -68.352384
min_latitude = 45.377109
max_latitude = 48.572820

ROWS_IN_DB = 35083
MIN_ID = 4953

longitude1 = random.uniform(min_longitude, max_longitude)
longitude2 = random.uniform(min_longitude, max_longitude)
latitude1 = random.uniform(min_latitude, max_latitude)
latitude2 = random.uniform(min_latitude, max_latitude)

max_longitude1, min_longitude1, max_latitude1, min_latitude1 = 0, 0, 0, 0

if longitude1 > longitude2:
    max_longitude1, min_longitude1 = longitude1, longitude2

if latitude1 > latitude2:
    max_latitude1, min_latitude1 = latitude1, latitude2

def test_get_location_info_with_filters():
    url = 'http://localhost:5000/api/locations'
    params = {
        'min_longitude': min_longitude1,
        'max_longitude': max_longitude1,
        'min_latitude': min_latitude1,
        'max_latitude': max_latitude1,
        'limit': 5 # Specify the limit parameter
    }
    response = requests.get(url, params=params)
    assert response.status_code == 200
    data = response.json()
    assert len(data['locations']) <= 5

def test_get_location_info_without_filters():
    url = 'http://localhost:5000/api/locations'
    response = requests.get(url)
    assert response.status_code == 200
    data = response.json()
    assert len(data['locations']) == ROWS_IN_DB  # Assuming ROWS_IN_DB is the number of rows in the database

def test_get_location_info_by_id():
    location_id = MIN_ID
    url = f'http://localhost:5000/api/locations/{location_id}'.format(location_id)
    response = requests.get(url)
    assert response.status_code == 200
    data = response.json()
    assert data['location_id'] == location_id

if __name__ == "__main__":
    test_get_location_info_with_filters()
    test_get_location_info_without_filters()
    test_get_location_info_by_id()
    print("All tests passed!")