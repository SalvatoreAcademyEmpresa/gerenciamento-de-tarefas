import React, { useState } from "react";
import "../css/TaskItem.css";
import moveIcon from "../assets/img/move-icon.svg";
import Reminder from "./reminder/Reminder";

const TaskItem = ({
  task,
  onEdit,
  onStartEdit,
  onDelete,
  isEditing,
  isCompleted,
  onToggleCompletion,
}) => {
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
          <div className="description-hover">
            <p>{task.description}</p>
          </div>
          <div
            className="icon-buttons"
            style={{ display: isHovered ? "flex" : "none" }}
          >
            <button onClick={onStartEdit} className="icon-edit-button-list">
              ✏️
            </button>
            <button
              onClick={handleDeleteClick}
              className="icon-delete-button-list"
            >
              🗑️
            </button>

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
