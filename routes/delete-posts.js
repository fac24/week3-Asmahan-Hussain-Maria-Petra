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
      response.status(500).send(`<h1> <a href="/posts">Go back posts</a></h1>`);
    });
}

module.exports = { post };
