import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

// Remova a linha abaixo, já que não é mais utilizada
// const ItemType = "TODO";

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

  const addTodo = (newTodo) => {
    setTodos([...todos, { text: newTodo, completed: false }]);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setEditingIndex(null);
    setIsEditing(false);
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-container">
        <header className="todo-header">
          {isEditing && (
            <div
              className="editing-indicator"
              onClick={() => console.log("Clicked!")}
            >
              Editing...
            </div>
          )}
          {isEditingTitle ? (
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={saveTitleEdit}
              onKeyPress={(e) => {
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
            <p className="edit-title">Tasks</p>
          </div>
          <div className="controls-edit">
            <p className="tasks-title">Edit</p>
          </div>
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
              todos={todos}
              setTodos={setTodos}
              moveTodo={moveTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
        <TaskForm onAdd={addTodo} />
      </div>
    </DndProvider>
  );
};

export default TodoList;
