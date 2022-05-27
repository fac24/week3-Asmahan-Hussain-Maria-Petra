const db = require("../database/connection.js");

function addPost(request, response) {
  if (request.body.movie) {
    //Get signed in users details
    db.query(`SELECT * FROM sessions;`)
      .then((user) => {
        return user.rows[user.rows.length - 1].data; //this is the email
      })
      //make a request with email to get user id and username
      .then((email) => {
        return db.query(`SELECT id, username FROM users WHERE email=$1;`, [
          email,
        ]);
      })
      // insert new movie post to DB with the user linked (by id)
      .then((data) => {
        let user_id = data.rows[0].id;
        const INSERT_POST = `INSERT INTO posts(user_id, movie_title, comment, rating) VALUES($1, $2, $3, $4)`;
        const values = [
          user_id,
          request.body.movie,
          request.body.comment,
          request.body.rating,
        ];
        return db.query(INSERT_POST, values);
      })
      .then(response.redirect("/posts"))
      .catch(() => {
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
        <h1>Oops, something went wrong.</h1>
        </body>
    </html>`);
      });
  }
}

module.exports = { addPost };
