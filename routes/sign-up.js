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
        <input type="password" id="password" aria-describedby="passwordRequirements" name="password" required pattern=".*\d.*"
        minlength="8">
        <button>Sign up</button>
      </form>
    `);
}

// // Validation rules:
// const signUpValidation = [
//   //check email
//   check('email', 'Email Must Be A Valid Email Address').isEmail().trim().escape().normalizeEmail(),
//   //check password
//   check('password').isLength({ min: 8 })
//   .withMessage('Password Must Be at Least 8 Characters')
//   .matches('[0-9]').withMessage('Password Must Contain a Number')
//   .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
//   .trim().escape()];

// Processing user input:
function post(request, response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const { username, email, password } = request.body;

    const hashedPassword = bcrypt.hash(password, 10);

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
}

module.exports = { get, post };
