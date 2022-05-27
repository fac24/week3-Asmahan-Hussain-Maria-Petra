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
      <h1>Create an account</h1>
      <form action="sign-up" method="POST">
        
      <label for="username">username
         <span aria-hidden="true">*</span></label>

        <input type="text" id="username" name="username" required>

        <label for="email">Email
        <span aria-hidden="true">*</span></label>

        <input type="email" id="email" name="email" required>

        <label for="password">Password
        <span aria-hidden="true">*</span></label>
        <div id="passwordRequirements" class="requirements"><br>
          Passwords must contain at least one letter, one number, and contain at
          least 8 characters.
        </div>
        <input type="password" id="password" aria-describedby="passwordRequirements" name="password" />
        <button class="button">Sign up</button>
      </form>
    `);
}

function post(request, response) {
  const { username, email, password } = request.body;
  // const hashedPassword = bcrypt.hash(password, 10);

  response.redirect("/login");
  createUser(username, email, password).catch((error) => {
    console.error(error);
    response
      .status(404)
      .send(
        `<h1>Something went wrong, sorry</h1> <a href="./sign-up">Try again</a>`
      );
  });
}

module.exports = { get, post };
