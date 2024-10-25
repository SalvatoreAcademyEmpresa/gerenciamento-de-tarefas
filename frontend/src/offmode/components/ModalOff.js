import React from "react";
import "../css/ModalOff.css";

const Modal = ({ title, description, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">{title}</div>

        <div className="modal-description">{description}</div>

        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Remove
          </button>

          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
