-- from the terminal run:
-- psql < air_traffic-normalized.sql

DROP DATABASE IF EXISTS air_traffic_normalized;

CREATE DATABASE air_traffic_normalized;

\c air_traffic_normalized




CREATE TABLE airlines
(
 airline_id SERIAL PRIMARY KEY,
 airline_name TEXT NOT NULL
 );
 


CREATE TABLE countries
(
 country_id SERIAL PRIMARY KEY,
 country_name TEXT NOT NULL
);

CREATE TABLE cities
(
 city_id SERIAL PRIMARY KEY,
 city_name TEXT NOT NULL
);

CREATE TABLE flights
(
  flight_id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INTEGER REFERENCES airlines
  
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL,
  flight_id INTEGER NOT NULL REFERENCES flights,
  from_city_id INTEGER NOT NULL REFERENCES cities,
  from_country_id INTEGER NOT NULL REFERENCES countries,
  to_city_id INTEGER NOT NULL REFERENCES cities,
  to_country_id INTEGER NOT NULL REFERENCES countries
);