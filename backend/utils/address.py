from geopy.geocoders import Nominatim
from geopy.point import Point

# Stats on our actual data in db
# TODO: not sure if it is good to hardcode these values
min_longitude = -79.514495
max_longitude = -68.352384
min_latitude = 45.377109
max_latitude = 48.572820
center_address = "Baie-de-la-Bouteille, Matawinie, Lanaudière, Québec, Canada"

def address_to_coordinates(address):
    geolocator = Nominatim(user_agent="qltrs")
    location = geolocator.geocode(address)
    if location:
        latitude = location.latitude
        longitude = location.longitude
        return latitude, longitude
    else:
        return None, None

def test_coordinates_validity(latitude, longitude): #TODO: needs review
    if latitude and longitude and \
       latitude >= min_latitude and latitude <= max_latitude \
       and longitude >= min_longitude and longitude <= max_longitude:
        return True
    else:
        return False


def coordinates_range_given_center(latitude, longitude, distance): #TODO: needs review
    # center is a tuple (latitude, longitude)
    # distance is in kilometers
    # returns a tuple (min_latitude, max_latitude, min_longitude, max_longitude)
    current_location = Point(latitude, longitude)
    new_location_north = current_location.destination(distance, 0)  # North
    new_location_east = current_location.destination(distance, 90)  # East
    new_location_south = current_location.destination(distance, 180)  # South
    new_location_west = current_location.destination(distance, 270)  # West

    min_latitude = new_location_south.latitude
    max_latitude = new_location_north.latitude
    min_longitude = new_location_west.longitude
    max_longitude = new_location_east.longitude

    return min_latitude, max_latitude, min_longitude, max_longitude

def get_address(latitude, longitude):
    geolocator = Nominatim(user_agent="qltrs")

    location = geolocator.reverse((latitude, longitude))
    address = location.address
    return address

if __name__ == "__main__":
    # very center of our dataset!!!
    address = get_address((min_latitude+max_latitude)/2, 
                              (min_longitude+max_longitude)/2)
    print(address) # Baie-de-la-Bouteille, Matawinie, Lanaudière, Québec, Canada