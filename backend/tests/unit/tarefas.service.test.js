const Task = require("../../tasks/tasks.model");
const tarefasService = require("../../tasks/tasks.service");

jest.mock("../../tasks/tasks.model");

describe("Tarefas Service", () => {
  test("should create a new task", async () => {
    const newTask = { title: "Test Task", description: "Test Description" };
    Task.prototype.save = jest.fn().mockResolvedValue(newTask);

    const result = await tarefasService.create(newTask);
    expect(result).toEqual(newTask);
  });

  test("should read all tasks", async () => {
    const tasks = [{ title: "Task 1", description: "Description 1" }];
    Task.find = jest.fn().mockResolvedValue(tasks);

    const result = await tarefasService.readAll();
    expect(result).toEqual(tasks);
  });

  test("should read a task by id", async () => {
    const task = { title: "Task 1", description: "Description 1" };
    Task.findById = jest.fn().mockResolvedValue(task);

    const result = await tarefasService.readById("some-id");
    expect(result).toEqual(task);
  });

  test("should update a task by id", async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated Description",
    };
    Task.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTask);

    const result = await tarefasService.updateById("some-id", updatedTask);
    expect(result).toEqual(updatedTask);
  });

  test("should delete a task by id", async () => {
    Task.findByIdAndDelete = jest.fn().mockResolvedValue({});

    const result = await tarefasService.deleteById("some-id");
    expect(result).toEqual({});
  });
});