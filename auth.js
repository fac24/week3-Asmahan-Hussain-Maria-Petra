const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const db = require("./database/connection.js");
const { user } = require("pg/lib/defaults");

function verifyUser(email, password) {
  const SELECT_USER = `
      SELECT id, username, email, password FROM users WHERE email=$1
    `;
  return db
    .query(SELECT_USER, [email])
    .then((users) => users.rows[0])
    .then((user) => {
      // console.log(password);
      // console.log(user.password);
      if (password === user.password) {
        return true;
      } else {
        false;
      }
      //return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      // console.log(match);
      if (!match) {
        throw new Error("Incorrect password");
      } else {
        delete user.password;
        return user;
      }
    });
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");

  const INSERT_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid`;

  return db
    .query(INSERT_SESSION, [sid, { user }])
    .then((result) => result.rows[0].sid);
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

module.exports = { verifyUser, saveUserSession, COOKIE_OPTIONS };
