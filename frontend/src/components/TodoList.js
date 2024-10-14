import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circles } from "react-loader-spinner";
import "../css/TodoList.css";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "../css/Modal.css";
import deleteSound from "../assets/audio/delete_sound.mp3";
import clickSound from "../assets/audio/click-som.mp3";
import addSound from "../assets/audio/add-som.mp3";

const API_URL = "http://localhost:3000/tasks";

const buildApiGetRequest = async (url) => {
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error("Erro ao carregar dados: " + url);
  }

  return await response.json();
};

const buildApiPostRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar dados: " + url);
  }

  return await response.json();
};

const buildApiPutRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar dados: " + url);
  }

  return await response.json();
};

const buildApiDeleteRequest = async (url) => {
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Erro ao remover dados: " + url);
  }

  return await response.json();
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Booking Movie Tickets");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const [showModal, setShowModal] = useState(false);
  const [indexToRemove, setIndexToRemove] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const audioDeleteRef = useRef(new Audio(deleteSound));
  const audioClickRef = useRef(new Audio(clickSound));
  const audioAddRef = useRef(new Audio(addSound));

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
    const newTaskObject = { text: newTask, completed: false };
    audioAddRef.current.play();
    toast.success("Task added successfully!");

    setIsSaving(true);
    try {
      await buildApiPostRequest(API_URL, newTaskObject);
      const updatedTasks = await buildApiGetRequest(API_URL);
      setTasks(updatedTasks);
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

        {loading ? (
          <div className="spinner-container">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <ul className="todo-list">
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                index={index}
                todo={task}
                editingIndex={editingIndex}
                isEditing={isEditing}
                removeTask={removeTask}
                toggleTaskCompletion={toggleTaskCompletion}
                saveEdit={saveEdit}
                moveTask={moveTask}
                addReminder={addReminder}
                openModal={openModal}
                cancelRemove={cancelRemove}
              />
            ))}
          </ul>
        )}

        <TaskForm addTask={addTask} isSaving={isSaving} />

        {showModal && (
          <div className="modal-overlay" onClick={cancelRemove}>
            <div className="modal">
              <h2>Are you sure?</h2>
              <p>Do you really want to delete this task?</p>
              <div className="modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="confirm-button" onClick={confirmRemove}>
                  Confirm
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
