const db = require("../database/connection");

const santitize = (input) => {
  return input.replace(/</g, "&lt;");
};

let postsHTML = "";
var sessionEmail;

async function getEmail() {
  SELECT_SESSION = `SELECT data FROM sessions;`;
  await db.query(SELECT_SESSION).then((result) => {
    //getting last user email from sessions table
    sessionEmail = result.rows[result.rows.length - 1].data;
  });
}

function showPosts(request, response) {
  getEmail();
  const cookie = request.signedCookies.sid;
  if (cookie) {
    const form = `
      <form method="POST" action="/add-post">
        <label for="movie">Movie title:</label>
        <input id="movie" name="movie" type="text" />
          <br />
        <label for="comment">Review:</label>
        <input id="comment" name="comment" type="text"/>
          <br />
        <label for="rating">Rating:</label>
        <input type="number" id="rating" name="rating" min="1" max="5" value="">
          <br />
        <button type="submit" class="btn">Post</button>
    `;

    const SELECT_USER = `SELECT users.username, users.email, posts.movie_title, posts.comment, posts.rating, 
    posts.id
    FROM posts
    INNER JOIN users
    ON users.id = posts.user_id;`;

    db.query(SELECT_USER)
      .then((result) => {
        const posts = result.rows;
        postsHTML = "";
        posts.forEach(
          (post) => {
            if (post.email === sessionEmail) {
              return (postsHTML += `
            <div class="post-container">
          <p>Username: ${santitize(post.username)}</p>
          <p>Movie: ${santitize(post.movie_title)}</p>
          <p>Comment: ${santitize(post.comment)}</p>
          <p>Rating: ${post.rating}</p>
                         <form  action="/delete-posts" method="POST">
                          <button type="submit" name="id" value="${post.id}" > 
                              &times;
                          </button>
                      </form>
          </div>
          `);
            } else {
              return (postsHTML += `
            <div class="post-container">
          <p>Username: ${santitize(post.username)}</p>
          <p>Movie: ${santitize(post.movie_title)}</p>
          <p>Comment: ${santitize(post.comment)}</p>
          <p>Rating: ${post.rating}</p>
          </div>
          `);
            }
          }
          //.concat(postsHTML)) //so posts to at top of list not bottom
        );
        return postsHTML;
      })
      .catch((error) => {
        console.error(error);
        response.status(404).send(`
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
        <h1>Posts not found</h1>
        </body>
  </html>
        `);
      })
      // I have passed on the postsHTML to the next promise and changed its name to fix render issue
      .then((postsToRender) => {
        response.send(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <link href="https://fonts.googleapis.com/css2?family=Limelight&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Ratings</title>
  </head>
  <body>
    <h1>Posts from all movie fanatics</h1>
    ${form}
    ${postsToRender}
    <section class="posts">
    </section>
  </body>
  `);
      });
  } else {
    response.send(`  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <link href="https://fonts.googleapis.com/css2?family=Limelight&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <title>Team 1</title>
    </head>
    <body>
      <h1>Please log in to view posts</h1>
      <a href="./login">sign in here</a>
    </body>`);
  }
}

module.exports = { showPosts };
