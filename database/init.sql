BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL
);

INSERT INTO users (email, password, name) VALUES (
  'test@gmail.com',
  'abc',
  'Name Names'
);

DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  data JSON NOT NULL
);

INSERT INTO sessions (sid, data) VALUES (
  'abc123',
  '{"test":"stuff"}'
);

COMMIT;