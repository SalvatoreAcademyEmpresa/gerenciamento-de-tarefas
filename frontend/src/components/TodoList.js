import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/TodoList.css";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "../css/Modal.css";
import deleteSound from "../assets/audio/delete_sound.mp3";
import clickSound from "../assets/audio/click-som.mp3";
import addSound from "../assets/audio/add-som.mp3";

import {
  buildApiGetRequest,
  buildApiPostRequest,
  buildApiPutRequest,
  buildApiDeleteRequest,
} from "../api/api";

const API_URL = "http://localhost:3000/tasks";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Booking Movie Tickets");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const [showModal, setShowModal] = useState(false);
  const [indexToRemove, setIndexToRemove] = useState(null);

  const audioDeleteRef = useRef(new Audio(deleteSound));
  const audioClickRef = useRef(new Audio(clickSound));
  const audioAddRef = useRef(new Audio(addSound));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await buildApiGetRequest(API_URL);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const newTaskObject = { text: newTask, completed: false };
    audioAddRef.current.play();
    toast.success("Task added successfully!");

    try {
      await buildApiPostRequest(API_URL, newTaskObject);
      const updatedTasks = await buildApiGetRequest(API_URL);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao adicionar a tarefa. Por favor, tente novamente.");
      setTasks([...tasks, newTaskObject]);
    }
  };

  const removeTask = async (index) => {
    const taskId = tasks[index]._id;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditingIndex(null);
    setIsEditing(false);
    audioDeleteRef.current.play();

    toast.error("Task deleted successfully!");

    try {
      await buildApiDeleteRequest(`${API_URL}/${taskId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const moveTask = async (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);

    try {
      await buildApiPostRequest(`${API_URL}/reorder`, updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const saveEdit = async (index, newText) => {
    const taskId = tasks[index]._id;
    const updatedTask = { ...tasks[index], text: newText };
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setIsEditing(false);
    audioAddRef.current.play();

    toast.info("Task edited successfully!");

    try {
      await buildApiPutRequest(`${API_URL}/${taskId}`, updatedTask);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    audioClickRef.current.play();

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

  const startEditingFirstTask = () => {
    if (tasks.length > 0) {
      setEditingIndex(0);
      setIsEditing(true);
    }
  };

  const openModal = (index) => {
    setIndexToRemove(index);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (indexToRemove !== null) {
      removeTask(indexToRemove);
      setShowModal(false);
    }
  };

  const cancelRemove = (event) => {
    if (event.target.className === "modal-overlay") {
      setIndexToRemove(null);
      setShowModal(false);
    }
  };

  const addReminder = (index) => {
    alert(`Reminder added for task: ${tasks[index].text}`);
  };

  const handleTitleEdit = () => {
    setTitle(editingTitle);
    setIsEditingTitle(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-container">
        <ToastContainer />
        <header className="todo-header">
          {isEditing && <div className="editing-indicator">Editing...</div>}
          {isEditingTitle ? (
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={handleTitleEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleEdit();
                }
              }}
              className="edit-title-input"
              autoFocus
            />
          ) : (
            <h1 className="todo-title" onClick={() => setIsEditingTitle(true)}>
              {title}
            </h1>
          )}

          <div className="controls-tasks">
            <p className="edit-title" onClick={startEditingFirstTask}>
              Tasks
            </p>
          </div>
          <div className="controls-edit">
            <p className="tasks-title" onClick={startEditingFirstTask}>
              Edit
            </p>
          </div>

          {editingIndex !== null && (
            <div className="controls-remove">
              <p
                className="remove"
                onClick={() => {
                  if (editingIndex !== null) {
                    openModal(editingIndex);
                  }
                }}
              >
                Remove
              </p>
            </div>
          )}
        </header>
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              index={index}
              todo={task}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              setIsEditing={setIsEditing}
              moveTodo={moveTask}
              toggleTodoCompletion={toggleTaskCompletion}
              saveEdit={saveEdit}
              removeTodo={removeTask}
              addReminder={addReminder}
            />
          ))}
        </ul>
        <TaskForm onAdd={addTask} />
        {isEditing && (
          <button
            className="save-button"
            onClick={() =>
              saveEdit(editingIndex, tasks[editingIndex]?.text || "")
            }
          >
            Save
          </button>
        )}
        {showModal && (
          <div className="modal-overlay" onClick={cancelRemove}>
            <div className="modal-content">
              <div className="modal-title">
                Are you sure you want to remove this?
              </div>
              <div className="modal-actions">
                <button className="close-button" onClick={confirmRemove}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TodoList;
