const db = require("../database/connection");

const santitize = (input) => {
  return input.replace(/</g, "&lt;");
};

let postsHTML = "";

function showPosts(request, response) {
  const sid = request.signedCookies.sid;
  // console.log(request.signedCookies);
  if (sid) {
    const form = `
      <form method="POST" action="/add-post">
        <label for="movie">Movie title:</label>
        <input id="movie" name="movie" type="text" />
          <br />
        <label for="comment">Review:</label>
        <input id="comment" name="comment" type="text"/>
          <br />
        <label for="rating">Fandom rating:</label>
        <input type="number" id="rating" name="rating" min="1" max="5" value="">
          <br />
        <button type="submit" class="btn">Post</button>
    `;

    // Will add the postsHTML to the HTML below ${postsHTML}
    const HTML = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <title>Team 1</title>
  </head>
  <body>
    <h1>Posts from all movie fanatics</h1>
    ${form}
    ${postsHTML}
    <section class="posts">
    </section>
  </body>
  `;

    const SELECT_USER = `SELECT users.username, users.email, posts.movie_title, posts.comment, posts.rating, 
    posts.id
    FROM posts
    INNER JOIN users
    ON users.id = posts.user_id;`;

    db.query(SELECT_USER).then((result) => {
      const posts = result.rows;
      postsHTML = "";
      // posts.forEach((post) => console.log(post));
      posts.forEach(
        (post) => {
          // console.log(post.id);

          return (postsHTML += `
                <div class="post-container">
                <p>Username: ${santitize(post.username)}</p>
                <p>Movie: ${santitize(post.movie_title)}</p>
                <p>Comment: ${santitize(post.comment)}</p>
                <p>Rating: ${santitize(post.rating)}</p>
                </div>
                <form  action="/delete-posts" method="POST">
                        <button name="id" value="${post.id}" > 
                            &times;
                        </button>
                    </form>
  `);
        }
        //.concat(postsHTML)) //so posts to at top of list not bottom
      );
    });

    // console.log(postsHTML);

    response.send(`${HTML}`);
  } else {
    response.send(`  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <title>Team 1</title>
    </head>
    <body>
      <h1>Please sign in to view posts</h1>
      <a href="sign-in">sign in here</a>
      </section>
    </body>`);
  }
}

module.exports = { showPosts };
