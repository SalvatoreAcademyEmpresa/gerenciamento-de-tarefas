import React, { useEffect, useState } from "react";
import {
  buildApiPutRequest,
  buildApiPostRequest,
  fetchTasks,
  API_URL,
} from "../api/api";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import "../css/TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromApi = await fetchTasks();
        setTasks(tasksFromApi);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Erro ao carregar tarefas.");
      }
    };

    loadTasks();
  }, []);

  const addTask = async (newTaskData) => {
    const requestBody = {
      title: newTaskData.title,
      description: newTaskData.description,
    };

    if (!isOffline) {
      try {
        const newTask = await buildApiPostRequest(API_URL, requestBody);
        setTasks([...tasks, newTask]);
        toast.success("Task added successfully!");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Erro ao adicionar tarefa.");
      }
    } else {
      const offlineTasks = [...tasks, { ...requestBody, _id: Date.now() }];
      localStorage.setItem("tasks", JSON.stringify(offlineTasks));
      setTasks(offlineTasks);
    }
  };

  const editTask = async (index, updatedTaskData) => {
    const taskId = tasks[index]?._id;

    if (!taskId) {
      console.error("Task ID is undefined for task at index:", index);
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTaskData };
    setTasks(updatedTasks);

    const requestBody = {
      title: updatedTaskData.title || updatedTasks[index].title,
      description:
        updatedTaskData.description || updatedTasks[index].description,
    };

    if (!isOffline) {
      try {
        await buildApiPutRequest(`${API_URL}/${taskId}`, requestBody);
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Erro ao atualizar a tarefa.");
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = async (taskId) => {
    if (!isOffline) {
      try {
        await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Erro ao deletar tarefa.");
      }
    } else {
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  return (
    <div className="todo-list-container">
      <h1>Task List</h1>
      <TaskForm onAdd={addTask} />{" "}
      <div className="task-items">
        {tasks.length === 0 ? (
          <p>No tasks available. Add a new task!</p>
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={(updatedTaskData) => editTask(index, updatedTaskData)}
              onDelete={() => deleteTask(task._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
