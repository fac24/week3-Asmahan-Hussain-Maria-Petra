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
    <a href="/login">Log In</a>
    <a href="/sign-up">Sign Up</a>
  </body>`;

  response.send(html);
}

module.exports = { get };
