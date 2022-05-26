const express = require("express");

const posts = require("./routes/view-posts.js");
const add = require("./routes/add-post.js");

const server = express();

const bodyHandler = express.urlencoded({ extended: false });

server.use(bodyHandler);

server.get("/posts", posts.showPosts);

server.post("/add-post", add.addPost);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
