# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for database initialization
ENV POSTGRES_DB=qltrs
ENV POSTGRES_USER=qltrs
ENV POSTGRES_PASSWORD=qltrs

# Combine SQL scripts or ensure the naming orders them correctly
COPY ./create.sql /docker-entrypoint-initdb.d/01-create.sql
COPY ./sql/location_info-data.sql /docker-entrypoint-initdb.d/02-location_info-data.sql

# No need to specify CMD since we're using the default command of the base image
