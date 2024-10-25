import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circles } from "react-loader-spinner";
import "../css/TodoList.css";
import {
  buildApiGetRequest,
  buildApiPostRequest,
  buildApiDeleteRequest,
  buildApiPutRequest,
} from "../api/api";

const API_URL = "http://localhost:3000/tasks";

const TodoList = ({ isOffline }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isOffline) {
        try {
          const data = await buildApiGetRequest(API_URL);
          setTasks(data);
        } catch (error) {
          toast.error("Erro ao carregar as tarefas.");
        } finally {
          setLoading(false);
        }
      } else {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [isOffline]);

  const addTask = async (newTask) => {
    const newTaskObject = {
      title: newTask.title,
      description: newTask.description,
      completed: false,
    };

    setIsSaving(true);
    try {
      if (!isOffline) {
        const addedTask = await buildApiPostRequest(API_URL, newTaskObject);
        setTasks((prevTasks) => [...prevTasks, addedTask]);
      } else {
        const updatedTasks = [...tasks, newTaskObject];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Houve um erro ao adicionar a tarefa.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeTask = async (index) => {
    const taskId = tasks[index]._id;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    if (!isOffline) {
      try {
        await buildApiDeleteRequest(`${API_URL}/${taskId}`);
      } catch (error) {
        toast.error("Erro ao deletar a tarefa.");
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    toast.success("Task deleted successfully!");
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);

    const taskId = tasks[index]._id;
    const updatedTask = {
      ...tasks[index],
      completed: !tasks[index].completed,
    };

    if (!isOffline) {
      try {
        await buildApiPutRequest(`${API_URL}/${taskId}`, updatedTask);
      } catch (error) {
        toast.error("Erro ao atualizar a tarefa.");
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const editTask = async (index, updatedTaskData) => {
    const taskId = tasks[index]._id;
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTaskData };
    setTasks(updatedTasks);

    if (!isOffline) {
      try {
        await buildApiPutRequest(`${API_URL}/${taskId}`, updatedTaskData);
        toast.success("Task updated successfully!");
      } catch (error) {
        toast.error("Erro ao atualizar a tarefa.");
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-container">
        <ToastContainer />
        <header className="todo-header">
          <h1 className="todo-title">Todo List</h1>
        </header>

        {loading ? (
          <div className="spinner-container">
            <Circles height="80" width="80" color="#4fa94d" visible={true} />
          </div>
        ) : (
          <ul className="todo-list">
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                index={index}
                todo={task}
                removeTodo={removeTask}
                toggleTodoCompletion={toggleTaskCompletion}
                editTodo={editTask}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
              />
            ))}
          </ul>
        )}

        <TaskForm onAdd={addTask} isSaving={isSaving} />
      </div>
    </DndProvider>
  );
};

export default TodoList;
