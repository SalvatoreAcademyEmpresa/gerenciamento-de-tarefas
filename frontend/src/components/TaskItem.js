import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskDetails from "../components/description/TaskDescriptionList";
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
  setIsEditing,
  removeTodo,
  toggleTodoCompletion,
}) => {
  const [editingText, setEditingText] = useState(todo.text);
  const [showDetails, setShowDetails] = useState(false);
  const [showCommentIcon, setShowCommentIcon] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

  const startEditing = () => {
    setEditingIndex(index);
    setEditingText(todo.text);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      setEditingIndex(null);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    removeTodo(index);
  };

  return (
    <>
      <li
        ref={(node) => ref(drop(node))}
        className={`todo-item ${isClicked ? "clicked" : ""}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onMouseEnter={() => setShowCommentIcon(true)}
        onMouseLeave={() => setShowCommentIcon(false)}
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
              onClick={startEditing}
            >
              <h2 className="task-title">{todo.title}</h2>
              <p className="task-text">{todo.text}</p>
            </div>
          )}

          {showCommentIcon && (
            <>
              <img
                src={chatIcon}
                alt="Comment Icon"
                className="comment-icon"
                onClick={() => setShowDetails(!showDetails)}
              />
              <Reminder />
            </>
          )}
        </div>
      </li>

      {showDetails && (
        <TaskDetails task={todo} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default TaskItem;
