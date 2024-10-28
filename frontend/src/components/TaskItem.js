import React, { useState } from "react";
import "../css/TaskItem.css";
import moveIcon from "../assets/img/move-icon.svg";

const TaskItem = ({ task, onEdit, onStartEdit, onDelete, isEditing }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    <div className="task-item">
      <img src={moveIcon} alt="Move icon" className="move-icon" />
      <input type="checkbox" className="custom-checkbox" />
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
          <p>{task.description}</p>
          <button onClick={() => onStartEdit()}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
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
