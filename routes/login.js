const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const db = require("../database/connection.js");
const auth = require("../auth.js");

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
    <h1>Log in</h1>
    <form method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button class="login-btn">Log in</button>
    </form>
    </body>
    </html>`);
}

function post(request, response) {
  const { email, password } = request.body;
  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession(email))
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/posts");
    })
    .catch((error) => {
      console.error(error);
      response.send(`
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
      <h1>User not found</h1> <a href="./login">Try again</a>
      </body>
  </html>`);
    });
}

module.exports = { get, post };
