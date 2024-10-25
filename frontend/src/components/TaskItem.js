import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Reminder from "./reminder/Reminder";
import moveIcon from "../assets/img/move-icon.svg";
import chatIcon from "../assets/img/chat.svg";
import "../css/TaskItem.css";

const ItemType = "TODO";

const TaskItem = ({ todo, index, removeTodo, toggleTodoCompletion }) => {
  const [isClicked, setIsClicked] = useState(false);

  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        item.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => ref(drop(node))}
      className={`todo-item ${isClicked ? "clicked" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="todo-content">
        <img src={moveIcon} alt="Move Icon" className="move-icon" />
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodoCompletion(index)}
          />
          <div className="custom-checkbox"></div>
        </div>
        <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
          <h2 className="task-title">{todo.title}</h2>
          <p className="task-description">{todo.description}</p>
        </div>
      </div>
      <button className="delete-button" onClick={() => removeTodo(index)}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
