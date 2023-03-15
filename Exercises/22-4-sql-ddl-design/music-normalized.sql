-- from the terminal run:
-- psql < music-normalized.sql

DROP DATABASE IF EXISTS music_normalized;

CREATE DATABASE music_normalized;

\c music_normalized


CREATE TABLE artist
(
  artis_id SERIAL PRIMARY KEY,
  artist_name TEXT NOT NULL
);


CREATE TABLE album
(
  album_id SERIAL PRIMARY KEY,
  album_name TEXT NOT NULL
);

CREATE TABLE producer
(
  producer_id SERIAL PRIMARY KEY,
  producer_name TEXT NOT NULL
);

CREATE TABLE albums_producer
(
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES album,
  producer_id INTEGER REFERENCES producer
);


CREATE TABLE song
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album_id INT REFERENCES album
);

CREATE TABLE songs_artist
(
  id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES artist,
  song_id INTEGER REFERENCES song
);

