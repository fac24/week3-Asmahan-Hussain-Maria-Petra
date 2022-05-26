const db = require("../database/connection");

function addPost(request, response) {
  const INSERT_POST = `INSERT INTO posts(movie_title, comment, rating) VALUES($1, $2, $3)`;
  const values = request.body;
  console.log(values);
  db.query(INSERT_POST, []); //the values are currently empty!

  response.redirect("/posts");
}

module.exports = { addPost };
