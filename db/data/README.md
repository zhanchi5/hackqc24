### Starting Postgres Container

1. **Run the Container**: 
   ```
   docker run --name qltrs -e POSTGRES_DB=qltrs -e POSTGRES_USER=qltrs -e POSTGRES_PASSWORD=qltrs -p 15432:5432 -d caowerdocker/db_qltrs:latest
   ```

2. **Access the Container**: 
   ```
   docker exec -it qltrs bash
   ```

3. **Login to PostgreSQL**: 
   ```
   psql -U qltrs -d qltrs
   ```

4. **List Tables**: 
   ```
   \dt
   ```

### Connecting the db with python program
First, use `pip` to install packages `SQLAlchemy` and `psycopg2-binary`:
```
pip install SQLAlchemy psycopg2-binary
```

Then, execute the example python program `connect_to_db.py`:
```  
python connect_to_db.py
```

The expected output is:
```
[('location_info',), ('users',), ('housing_info',), ('reviews',)]
```

### Dataset description (updated 3.13)
```sql
qltrs=# SELECT
    MAX(longitude) AS max_longitude,
    MIN(longitude) AS min_longitude,
    MAX(latitude) AS max_latitude,
    MIN(latitude) AS min_latitude
FROM
    location_info;
 max_longitude | min_longitude | max_latitude | min_latitude
---------------+---------------+--------------+--------------
    -68.352384 |    -79.514495 |    48.572820 |    45.377109
(1 row)

qltrs=# SELECT
    AVG(crime_index) AS avg_crime_index,
    AVG(pollution_index) AS avg_pollution_index,
    AVG(disaster_index) AS avg_disaster_index
FROM
    location_info;
FATAL:  terminating connection due to administrator command
server closed the connection unexpectedly
        This probably means the server terminated abnormally
        before or while processing the request.
The connection to the server was lost. Attempting reset: Succeeded.
qltrs=# SELECT
    AVG(crime_index) AS avg_crime_index,
    AVG(pollution_index) AS avg_pollution_index,
    AVG(disaster_index) AS avg_disaster_index
FROM
    location_info;
   avg_crime_index   | avg_pollution_index | avg_disaster_index
---------------------+---------------------+--------------------
 36.5500384801755836 | 15.5651740159051392 | 5.8603882222158880
(1 row)

qltrs=# SELECT
    COUNT(*) AS total_records
FROM
    location_info;
 total_records
---------------
         35083
(1 row)

qltrs=# SELECT
    MAX(crime_index) AS max_crime_index,
    MIN(crime_index) AS min_crime_index,
    MAX(pollution_index) AS max_pollution_index,
    MIN(pollution_index) AS min_pollution_index,
    MAX(disaster_index) AS max_disaster_index,
    MIN(disaster_index) AS min_disaster_index
FROM
    location_info;
 max_crime_index | min_crime_index | max_pollution_index | min_pollution_index | max_disaster_index | min_disaster_index
-----------------+-----------------+---------------------+---------------------+--------------------+--------------------
              94 |               0 |                  40 |                   0 |                100 |                  0
(1 row)

qltrs=# select count(*) from location_info where crime_index > 90;
 count
-------
   790
(1 row)

qltrs=# select count(*) from location_info where crime_index > 75;
 count
-------
  2002
(1 row)

qltrs=# select count(*) from location_info where crime_index > 50;
 count
-------
 14927
(1 row)

qltrs=# select count(*) from location_info where crime_index > 25;
 count
-------
 22803
(1 row)

qltrs=# select count(*) from location_info where pollution_index > 30;
 count
-------
  2317
(1 row)

qltrs=# select count(*) from location_info where pollution_index > 20;
 count
-------
  5633
(1 row)

qltrs=# select count(*) from location_info where pollution_index > 10;
 count
-------
 22150
(1 row)

qltrs=# select count(*) from location_info where pollution_index > 15;
 count
-------
 11563
(1 row)

qltrs=# select count(*) from location_info where pollution_index > 5;
 count
-------
 33721
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 90;
 count
-------
   251
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 75;
 count
-------
   251
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 50;
 count
-------
   251
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 25;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 10;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 5;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 3;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 2;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 1;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index > 0;
 count
-------
  3861
(1 row)

qltrs=# select count(*) from location_info where disaster_index = 0;
 count
-------
 31222
(1 row)
```