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
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [title, setTitle] = useState("Booking Movie Tickets");
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromApi = await fetchTasks();
        setTasks(tasksFromApi);
        const savedTitle = localStorage.getItem("title");
        if (savedTitle) {
          setTitle(savedTitle);
        }

        const savedCompletedTasks =
          JSON.parse(localStorage.getItem("completedTasks")) || {};
        setCompletedTasks(savedCompletedTasks);
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
    setShowAddTaskModal(false);
  };

  const saveTask = async (updatedTaskData, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      ...updatedTaskData,
    };

    if (!isOffline) {
      try {
        await buildApiPutRequest(
          `${API_URL}/${updatedTasks[index]._id}`,
          updatedTaskData
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Erro ao atualizar tarefa.");
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }

    setIsEditing(false);
    setEditingTaskIndex(null);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedCompletedTasks = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId],
    };

    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setEditingTaskIndex(index);
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task._id !== id);

    if (!isOffline) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setTasks(updatedTasks);
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Erro ao deletar tarefa.");
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  const editTitle = (newTitle) => {
    setTitle(newTitle);
    localStorage.setItem("title", newTitle);
  };

  return (
    <div className="todo-list-container">
      <h2 className="tasks-header">Tasks</h2>
      {isEditing && <div className="editing-banner">Editing...</div>}
      <h1
        className="main-title"
        onClick={() => {
          const newTitle = prompt("Edit Title:", title);
          if (newTitle) {
            editTitle(newTitle);
          }
        }}
      >
        {title}
      </h1>
      <br /> <br /> <br />
      <div className="task-items">
        {tasks.length === 0 ? (
          <p>No tasks available. Check your connection to the server!</p>
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={task._id}
              task={task}
              isCompleted={completedTasks[task._id] || false}
              onEdit={(updatedTaskData) => saveTask(updatedTaskData, index)}
              onStartEdit={() => startEditing(index)}
              onDelete={() => deleteTask(task._id)}
              onToggleCompletion={() => toggleTaskCompletion(task._id)}
              isEditing={isEditing && editingTaskIndex === index}
            />
          ))
        )}
      </div>
      <div className="add-new-task" onClick={() => setShowAddTaskModal(true)}>
        Add new
      </div>
      {showAddTaskModal && (
        <div className="modal">
          <TaskForm onAdd={addTask} />
          <button
            className="close-modal"
            onClick={() => setShowAddTaskModal(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
