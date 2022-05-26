const bcrypt = require("bcryptjs");

function getUser(email) {
  const SELECT_USER = `
      SELECT id, email, password, name FROM users WHERE email=$1
    `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function verifyUser(email, password) {
  return getUser(email).then((user) =>
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("Password mismatch");
      } else {
        // make sure we never return the password
        delete user.password;
        return user;
      }
    })
  );
}

function get(request, response) {
  response.send(`
      <h1>Log in</h1>
      <form action="log-in" method="POST">
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
  verifyUser(email, password)
    .then(response.redirect("/"))
    .catch((error) => {
      console.error(error);
      response.send(`<h1>User not found</h1>`);
    });
}
