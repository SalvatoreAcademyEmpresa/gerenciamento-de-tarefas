import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAddingDescription, setIsAddingDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAddingDescription) {
      if (title.trim()) {
        setIsAddingDescription(true);
      } else {
        alert("Por favor, preencha o título.");
      }
    } else {
      if (description.trim()) {
        onAdd({ title, description });
        setTitle("");
        setDescription("");
        setIsAddingDescription(false);
      } else {
        alert("Por favor, preencha a descrição.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isAddingDescription ? (
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      ) : (
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      )}
      <button type="submit">➕</button>
    </form>
  );
};

export default TaskForm;
