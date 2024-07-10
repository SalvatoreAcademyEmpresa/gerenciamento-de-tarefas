import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/TodoList.css"; // Import the CSS file for the todo container
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "../css/Modal.css"; // Import the CSS file for the modal
import deleteSound from "../assets/delete_sound.mp3"; // Import the delete sound

const TodoList = () => {
  const [todos, setTodos] = useState([
    { text: "Set a reminder beforehand", completed: false },
    { text: "Find a location", completed: false },
    { text: "Screenshot the address", completed: false },
    { text: "Book the tickets", completed: false },
    { text: "Find out the parking", completed: false },
    { text: "Call them", completed: false },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Booking Movie Tickets");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const [showModal, setShowModal] = useState(false);
  const [indexToRemove, setIndexToRemove] = useState(null);
  const audioRef = useRef(new Audio(deleteSound)); // Create an audio reference

  const addTodo = (newTodo) => {
    setTodos([...todos, { text: newTodo, completed: false }]);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setEditingIndex(null);
    setIsEditing(false);
    audioRef.current.play(); // Play the delete sound
  };

  const saveTitleEdit = () => {
    setTitle(editingTitle);
    setIsEditingTitle(false);
  };

  const moveTodo = (dragIndex, hoverIndex) => {
    const draggedTodo = todos[dragIndex];
    const updatedTodos = [...todos];
    updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, draggedTodo);
    setTodos(updatedTodos);
  };

  const saveEdit = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setIsEditing(false);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const startEditingFirstTask = () => {
    if (todos.length > 0) {
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
      removeTodo(indexToRemove);
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
    // Função para adicionar um lembrete para uma tarefa específica
    alert(`Reminder added for task: ${todos[index].text}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-container">

        <header className="todo-header">
          {isEditing && <div className="editing-indicator">Editing...</div>}
          {isEditingTitle ? (
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={saveTitleEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTitleEdit();
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
          {todos.map((todo, index) => (
            <TaskItem
              key={index}
              index={index}
              todo={todo}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              setIsEditing={setIsEditing}
              moveTodo={moveTodo}
              toggleTodoCompletion={toggleTodoCompletion}
              saveEdit={saveEdit}
              removeTodo={removeTodo}
              addReminder={addReminder} // Passando a função para o TaskItem
            />
          ))}
        </ul>
        
        <TaskForm onAdd={addTodo} />
        {isEditing && (
          <button
            className="save-button"
            onClick={() => saveEdit(editingIndex, todos[editingIndex].text)}
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
