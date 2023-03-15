-- from the terminal run:
-- psql < outer_space-normalized.sql

DROP DATABASE IF EXISTS outer_space_normalized;

CREATE DATABASE outer_space_normalized;

\c outer_space_normalized




CREATE TABLE STARS
(
  star_id SERIAL PRIMARY KEY,
  star TEXT NOT NULL
);

CREATE TABLE GALAXIES
(
  galaxy_id SERIAL PRIMARY KEY,
  galaxy TEXT NOT NULL
);

CREATE TABLE MOONS
( moon_id SERIAL PRIMARY KEY,
  moon_name TEXT NOT NULL
);


CREATE TABLE PlANETS
(
  planet_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around INTEGER NOT NULL REFERENCES STARS,
  galaxy INTEGER NOT NULL REFERENCES GALAXIES
);

CREATE TABLE PLANETS_MOONS
(
  id SERIAL PRIMARY KEY,
  moon_id INTEGER NOT NULL REFERENCES MOONS,
  planet_id INTEGER NOT NULL REFERENCES PlANETS
)
