const db = require("../database/connection.js");
function deletePosts(id) {
  const deletePost = /* sql */ `DELETE FROM posts WHERE id=$1`;
  return db.query(deletePost, [id]);
}

function post(request, response) {
  const { id } = request.body;
  console.log("request.body");

  deletePosts(id)
    .then(() => {
      response.redirect("/posts");
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send(`
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
      <h1> <a href="/posts">Go back posts</a></h1>
      </body>
    </html>
      `);
    });
}

module.exports = { post };
