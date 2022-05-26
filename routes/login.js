const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const db = require("../database/connection.js");
const auth = require("../auth.js");

function get(request, response) {
  response.send(`
    <h1>Log in</h1>
    <form method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
    </form>
  `);
}

function post(request, response) {
  const { email, password } = request.body;
  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession(email))
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/posts");
      console.log("Successful login");
    })
    .catch((error) => {
      console.error(error);
      response.send(`<h1>User not found</h1>`);
    });
}

module.exports = { get, post };
