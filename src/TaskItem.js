import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import icon from "./assets/icon.png";

const ItemType = "TODO";

const TaskItem = ({
  todo,
  index,
  editingIndex,
  setEditingIndex,
  setIsEditing,
  todos,
  setTodos,
  moveTodo,
  removeTodo,
}) => {
  const [editingText, setEditingText] = useState(todo.text);
  const isCurrentEditing = editingIndex === index;
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    canDrag: !isCurrentEditing,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (isCurrentEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCurrentEditing]);

  const saveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editingText;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText("");
    setIsEditing(false);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
    setIsEditing(true);
  };

  return (
    <li
      ref={(node) => ref(drop(node))}
      className="todo-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="todo-content">
        <img src={icon} alt="icon" className="Move-icon" />
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodoCompletion(index)}
          />
          <div className="custom-checkbox"></div>
        </div>
        {isCurrentEditing ? (
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="edit-input"
            ref={inputRef}
          />
        ) : (
          <div
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onClick={() => startEditing(index)}
          >
            {todo.text}
          </div>
        )}
      </div>
      {isCurrentEditing && (
        <div className="todo-actions">
          <button
            className="edit-title"
            onClick={(e) => {
              e.stopPropagation();
              saveEdit(index);
            }}
          >
            Save
          </button>
          <button
            className="remove-title"
            onClick={(e) => {
              e.stopPropagation();
              removeTodo(index);
            }}
          >
            Remove
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
