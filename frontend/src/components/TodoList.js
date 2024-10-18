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

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await buildApiGetRequest(API_URL);
        setTasks(data);
      } catch (error) {
        toast.error("Erro ao carregar as tarefas.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const newTaskObject = { ...newTask, completed: false };
    toast.success("Task added successfully!");

    setIsSaving(true);
    try {
      const addedTask = await buildApiPostRequest(API_URL, newTaskObject);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro ao adicionar a tarefa.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeTask = async (index) => {
    const taskId = tasks[index]._id;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditingIndex(null);
    setIsEditing(false);

    toast.error("Task deleted successfully!");

    try {
      await buildApiDeleteRequest(`${API_URL}/${taskId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);

    try {
      const taskId = tasks[index]._id;
      const updatedTask = {
        ...tasks[index],
        completed: !tasks[index].completed,
      };
      await buildApiPutRequest(`${API_URL}/${taskId}`, updatedTask);
    } catch (error) {
      console.error(error);
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
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                setIsEditing={setIsEditing}
                removeTodo={removeTask}
                toggleTodoCompletion={toggleTaskCompletion}
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
