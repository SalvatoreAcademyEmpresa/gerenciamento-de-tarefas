import React, { useState } from "react";
import "../css/TaskItem.css";
import moveIcon from "../assets/img/move-icon.svg";

const TaskItem = ({ task, onEdit, onStartEdit, onDelete, isEditing }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      className="task-item-list"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={moveIcon} alt="Move icon" className="move-icon-list" />
      <input type="checkbox" className="custom-checkbox-list" />
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
          <h3>{task.title}</h3>
          <div className="description-hover">
            <p>{task.description}</p>
          </div>
          <div
            className="icon-buttons"
            style={{ display: isHovered ? "flex" : "none" }}
          >
            {" "}
            <button onClick={onStartEdit} className="icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
                fill="#1d2939"
              >
                <path d="M12.3 3.3c.4-.4 1-.4 1.4 0l7 7c.4.4.4 1 0 1.4l-8 8c-.1.1-.3.2-.4.2h-5c-.3 0-.5-.2-.5-.5v-5c0-.1.1-.3.2-.4l8-8zm-2.8 9.8v2h2l8-8-2-2-8 8z" />
              </svg>
              Edit
            </button>
            <button onClick={handleDeleteClick} className="icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
                fill="#d9534f"
              >
                <path d="M3 6h18v2h-1v12c0 1.1-.9 2-2 2h-12c-1.1 0-2-.9-2-2v-12h-1v-2zm14 0v12h-10v-12h10zm-6 10v-6h-2v6h2zm4-6v6h-2v-6h2zm-1-10h-4c-.6 0-1 .4-1 1v1h-4v2h14v-2h-4v-1c0-.6-.4-1-1-1z" />
              </svg>
              Delete
            </button>
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
