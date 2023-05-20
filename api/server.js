// build your server here and require it from index.js
const express = require("express");
const ProjectRouter = require("./project/router");
const ResourceRouter = require("./resource/router");
const TaskRouter = require("./task/router");

const server = express();
server.use(express.json());
server.use("/api/projects", ProjectRouter);
 server.use("/api/resources", ResourceRouter);
 server.use("/api/tasks", TaskRouter);

server.get("*", (req, res) => {
  res.status(404).json("Page Not Found");
});

module.exports = server;
