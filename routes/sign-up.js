const bcrypto = require("bcryptjs");
const db = require("../database/connection.js");

function createUser(username, email, password) {
  const INSERT_USER = `
    INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
  `;
  return db
    .query(INSERT_USER, [username, email, password])
    .then((result) => result.rows[0]);
}

function get(request, response) {
  response.send(`
      <h1>Create an account</h1>
      <form action="sign-up" method="POST">
        <label for="username">username</label>
        <input type="text" id="username" name="username">
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button>Sign up</button>
      </form>
    `);
}

function post(request, response) {
  const { username, email, password } = request.body;
  console.log(request.body);

  const hashedPassword = bcrypto.hash(password, 10);

  createUser(username, email, password).catch((error) => {
    console.error(error);
    response.send(`<h1>Something went wrong, sorry</h1>`);
  });
}

module.exports = { get, post };
