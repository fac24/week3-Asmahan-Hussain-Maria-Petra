const express = require("express");

const posts = require("./routes/view-posts.js");

const server = express();

server.get("/posts", posts.showPosts);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
