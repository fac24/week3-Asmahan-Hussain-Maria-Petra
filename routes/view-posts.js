const db = require("../database/connection");

const santitize = (input) => {
  return input.replace(/</g, "&lt;");
};

function showPosts(request, response) {
  // const SELECT_USER = `SELECT users.username, movie_title.posts, comment.posts, rating.posts.
  //   FROM users
  //   INNER JOIN posts
  //   ON users.id = posts.user_id`;
  // db.query(SELECT_USER).then((result) => {
  //   console.log(result);
  // Assuming below is correct it can be uncommented. Can't test on my laptop with no database setup :'(

  //   let postsHTML = "";
  //   const posts = result.rows;
  //   posts.map(
  //     (post) =>
  //       (postsHTML = `
  //       <div class="post-container">
  //       <p>Username: ${santitize(post.username)}</p>
  //       <p>Movie: ${santitize(post.movie_title)}</p>
  //       <p>Comment: ${santitize(post.comment)}</p>
  //       <p>Rating: ${santitize(post.rating)}</p>
  //       </div>

  //       `.concat(postsHTML)) //so posts to at top of list not bottom
  //   );
  //   return postsHTML;
  // });

  const form = `
    <form method="POST" action="/add-post">
      <label for="movie">Movie title:</label>
      <input id="movie" name="movie" type="text" />
        <br />
      <label for="comment">Review:</label>
      <input id="comment" name="comment" type="text" />
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
    <section class="posts">
    </section>
  </body>
  `;

  response.send(`${HTML}`);
}

module.exports = { showPosts };
