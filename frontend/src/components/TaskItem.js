import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Reminder from "./reminder/Reminder";
import moveIcon from "../assets/img/move-icon.svg";
import chatIcon from "../assets/img/chat.svg";
import "../css/TaskItem.css";

const ItemType = "TODO";

const TaskItem = ({
  todo,
  index,
  editingIndex,
  setEditingIndex,
  removeTodo,
  toggleTodoCompletion,
  editTodo,
}) => {
  const [editingText, setEditingText] = useState(todo.description);
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const isCurrentEditing = editingIndex === index;

  const startEditing = () => {
    setEditingIndex(index);
    setEditingText(todo.description);
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = () => {
    if (editingText.trim() && editingTitle.trim()) {
      editTodo(index, { title: editingTitle, description: editingText });
      setEditingIndex(null);
    }
  };

  return (
    <li className={`todo-item ${isCurrentEditing ? "editing" : ""}`}>
      <div className="todo-content">
        {isCurrentEditing ? (
          <>
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
            />
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Save</button>
          </>
        ) : (
          <>
            <h2 onClick={startEditing}>{todo.title}</h2>
            <p onClick={startEditing}>{todo.description}</p>
          </>
        )}
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
