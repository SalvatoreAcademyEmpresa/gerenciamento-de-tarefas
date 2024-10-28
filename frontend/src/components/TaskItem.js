import React, { useState } from "react";
import "../css/TaskItem.css";

const TaskItem = ({ task, onEdit, onStartEdit, onDelete, isEditing }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSaveEdit = () => {
    onEdit({ title, description });
  };

  return (
    <div className="task-item">
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
          {/* TODO:<button onClick={() => onStartEdit(null)}>Cancel</button> */}
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => onStartEdit()}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
      {/* TODO:<div className="comments">Comentários sobre a tarefa</div>{" "} */}
    </div>
  );
};

export default TaskItem;
