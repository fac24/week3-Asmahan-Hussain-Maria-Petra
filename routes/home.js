function get(request, response) {
  const html = `
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
    <h1>Magnificent Movie Reviews</h1>
    <img src="icon.png">
    <div>
    <a href="/login" class="login-link">Log In</a>
    <a href="/sign-up" class="signup-link">Sign Up</a>
    </div>
  </body>
  </html>`;

  response.send(html);
}

module.exports = { get };
