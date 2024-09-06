require("dotenv").config();
const express = require("express");
const { connectToDatabase } = require("./db/database-connection");

const tasksRouter = require("./tasks/tasks.router");
const commentsRouter = require('./Comentários/comment.router')
const lembreteRouter = require('./Lembretes/lembrete.router')

async function main() {
  await connectToDatabase();
  const app = express();

  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  app.use("/tasks", tasksRouter);
  app.use("/comments", commentsRouter);
  app.use("/lembretes", lembreteRouter);  

  app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
  });
}

main();