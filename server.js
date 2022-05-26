const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const home = require("./routes/home.js");
const posts = require("./routes/view-posts.js");
const add = require("./routes/add-post.js");
const signUp = require("./routes/sign-up.js");
const login = require("./routes/login.js");

const server = express();

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(cookieParser("asddfghjkloiuztr"));
server.use(bodyHandler);
server.use(staticHandler);

server.get("/posts", posts.showPosts);
server.post("/add-post", add.addPost);
server.get("/", home.get);
server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);

server.get("/login", login.get);
server.post("/login", login.post);
server.get("*", (req, res) => {
  res.send(`<h1>Page not found</h1>`, 404);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});
