function showPosts(request, response) {
  const HTML = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css" />
    <title>Team 1</title>
  </head>
  <body>
    <h1>Posts to date</h1>
    <a href="/add-post">Click here to add a post!</a>
  </body>
  `;

  response.send(`${HTML}`);
}

module.exports = { showPosts };
