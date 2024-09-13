const { required } = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;