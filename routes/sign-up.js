const bcrypt = require("bcryptjs");
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
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="styles.css">
      <link href="https://fonts.googleapis.com/css2?family=Limelight&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <title>Movie Reviews</title>
    </head>
    <body>
      <h1>Create an account</h1>
      <form action="sign-up" method="POST">
        
      <label for="username">username
        <input type="text" id="username" name="username" required>
        <label for="email">Email
        <input type="email" id="email" name="email" required>
        <label for="password">
        <input type="password" id="password" name="password" required>
        <button class="button">Sign up</button>
      </form>
      </body>
    </html>
    `);
}

function post(request, response) {
  const { username, email, password } = request.body;

  // const hashedPassword = bcrypt.hash(password, 10);


  response.redirect("/login");
  createUser(username, email, password).catch((error) => {
    console.error(error);
    response.status(404).send(
      `
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Limelight&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Movie Reviews</title>
  </head>
  <body>
          <h1>Something went wrong, sorry</h1> <a href="./sign-up">Try again</a>
          </body>
    </html>`
    );
  });
}

module.exports = { get, post };
