const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session")
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const server = express();

const sessionConfig = {
  name: "chocolatechip",
  secret: "cookiesAreYUMMY",
  cookie: {
    maxAge: 1000 * 60 *2,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitalized: false,
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRouter)
server.use("/api/users", usersRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
