BEGIN; 

DROP TABLE IF EXISTS users, posts, sessions CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  email  TEXT UNIQUE NOT NULL,
  password  TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- CASCADE means delete the post if the author gets deleted
  movie_title TEXT,
  comment TEXT,
  rating NUMBER
);

CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  data JSON NOT NULL
);

INSERT INTO users (username, email, password) VALUES
  ('movielover', 'movies@email.com', "12345"),
  ('horrrofanatic', 'hello@email.com', "abcdef"),
  ('musicals101', 'goodbye@email.com', "67890")
;

INSERT INTO posts (user_id, movie_title, comment, rating) VALUES
  (1, 'Forest Gump', 'Can watch this over and over again.', 5),
  (2, 'Saw III', 'Didnt even flinch', 2),
  (3, 'Moulin Rouge', 'Made me cry, but I cry in all movies', 3),
;

INSERT INTO sessions (sid, data) VALUES (
  'abc123',
  '{"test":"stuff"}'
);

COMMIT;