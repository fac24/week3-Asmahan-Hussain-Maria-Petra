const express = require("express");
const signUp = require("./routes/sign-up");

const server = express();

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(bodyHandler);
server.use(staticHandler);
server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}/sign-up`)
);
