import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../css/TaskItem.css";
import TaskDetails from "../components/comment/CommentList";

import moveIcon from "../assets/img/move-icon.svg";
import chatIcon from "../assets/img/chat.svg";
import calendarIcon from "../assets/img/calendar.svg";
import editIcon from "../assets/img/edit-icon.svg";
import binIcon from "../assets/img/bin.svg";

import { buildApiDeleteRequest, API_URL } from "../api/api";

const ItemType = "TODO";

const TaskItem = ({
  todo,
  index,
  editingIndex,
  setEditingIndex,
  setIsEditing,
  removeTodo,
  moveTodo,
  toggleTodoCompletion,
  saveEdit,
}) => {
  const [editingText, setEditingText] = useState(todo.text);
  const [showDetails, setShowDetails] = useState(false);
  const [showCommentIcon, setShowCommentIcon] = useState(false);
  const [isCommentIconEnabled] = useState(true);
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

  const startEditing = () => {
    setEditingIndex(index);
    setEditingText(todo.text);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      saveEdit(index, editingText);
      setEditingIndex(null);
      setIsEditing(false);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleReminderClick = () => {
    // TODO: Implementar integração com calendário
    window.location.href = "https://calendar.google.com/calendar/u/0/r";
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 100);
  };

  const handleDelete = async () => {
    try {
      await buildApiDeleteRequest(`${API_URL}/${todo._id}`);
      removeTodo(index);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <li
        ref={(node) => ref(drop(node))}
        className={`todo-item ${isClicked ? "clicked" : ""}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onMouseEnter={() => setShowCommentIcon(true)}
        onMouseLeave={() => setShowCommentIcon(false)}
        onClick={handleClick}
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
              onChange={(e) => {
                setEditingText(e.target.value);
                todo.text = e.target.value;
              }}
              className="edit-input"
              ref={inputRef}
            />
          ) : (
            <div
              className={`todo-text ${todo.completed ? "completed" : ""}`}
              onClick={startEditing}
            >
              {todo.text}
            </div>
          )}

          {showCommentIcon && (
            <>
              <img
                src={chatIcon}
                alt="Comment Icon"
                className={`comment-icon ${
                  !isCommentIconEnabled ? "disabled" : ""
                }`}
                onClick={isCommentIconEnabled ? toggleDetails : undefined}
              />

              <img
                src={calendarIcon}
                alt="Reminder Icon"
                className="reminder-icon"
                onClick={handleReminderClick}
              />

              {/* TODO:  <img
                src={editIcon}
                alt="Edit Icon"
                className="edit-icon"
                onClick={startEditing}
              /> */}
              {/* <img
                src={binIcon}
                alt="Remove Icon"
                className="remove-icon"
                onClick={handleDelete}
              /> */}
            </>
          )}
        </div>
      </li>

      {showDetails && <TaskDetails task={todo} onClose={toggleDetails} />}
    </>
  );
};

export default TaskItem;
