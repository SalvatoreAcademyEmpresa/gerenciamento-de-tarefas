const request = require("supertest");
const express = require("express");
const tasksRouter = require("../../tasks/tasks.router");
const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);

describe("Tarefas Router", () => {
  test("should create a new task", async () => {
    const newTask = { title: "Test Task", description: "Test Description" };

    const response = await request(app)
      .post("/tasks")
      .send(newTask)
      .expect(201);

    expect(response.body).toEqual(expect.objectContaining(newTask));
  }, 20000);

  test("should read all tasks", async () => {
    const response = await request(app).get("/tasks").expect(200);

    expect(response.body).toBeInstanceOf(Array);
  }, 20000);
});
