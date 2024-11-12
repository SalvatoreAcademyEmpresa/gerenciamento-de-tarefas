import React, { useState } from "react";
import "../css/TaskItem.css";
import moveIcon from "../assets/img/move-icon.svg";
import chatIcon from "../assets/img/chat.svg";
import Reminder from "../components/reminder/Reminder";

const TaskItem = ({
  task,
  onEdit,
  onDelete,
  onMove,
  onToggleCompletion,
  isEditing,
  isCompleted,
  onStartEdit,
  onReminder,
  index,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleSaveEdit = () => {
    onEdit({ title, description });
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData("index"));
    onMove(draggedIndex, index);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div
      className="task-item-list"
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={moveIcon} alt="Move icon" className="move-icon-list" />
      <input
        type="checkbox"
        className="custom-checkbox-list"
        checked={isCompleted}
        onChange={onToggleCompletion}
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="save-button" onClick={handleSaveEdit}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
            {task.title}
          </h3>
          {showDescription && <p>{task.description}</p>}
          <div
            className="icon-buttons"
            style={{ display: isHovered ? "flex" : "none" }}
          >
            <button onClick={onStartEdit} className="icon-edit-button-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="1rem"
                height="1rem"
              >
                <path d="M4 21h16v-2H4v2zm3.5-4.5l1.09-1.09 7.09 7.09L14.5 21H4v-2h3.5v-2.5zm9.91-9.91l-1.41-1.41 2.83-2.83 1.41 1.41-2.83 2.83zm-1.41 1.41L7.5 18.5V21h2.5l8.5-8.5-2.5-2.5z" />
              </svg>
            </button>
            <button
              onClick={handleDeleteClick}
              className="icon-delete-button-list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="1rem"
                height="1rem"
              >
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
              </svg>
            </button>
            <img
              src={chatIcon}
              alt="Chat icon"
              className="chat-icon"
              onClick={toggleDescription}
            />
            <Reminder />
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to remove this?</p>
            <button onClick={confirmDelete} className="confirm-button">
              Remove
            </button>
            <button onClick={cancelDelete} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
