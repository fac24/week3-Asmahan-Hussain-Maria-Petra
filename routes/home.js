function get(request, response) {
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <title>Movie Reviews</title>
  </head>
  <body>
    <h1>Magnificent Movie Reviews</h1>
    <a href="/login" class="login-link">Log In</a>
    <a href="/sign-up" class="signup-link">Sign Up</a>
  </body>
  </html>`;

  response.send(html);
}

module.exports = { get };
