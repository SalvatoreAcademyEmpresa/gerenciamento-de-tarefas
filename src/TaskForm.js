import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      onAdd(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="todo-input-container">
      <div className="todo-checkbox"></div>
      <input
        type="text"
        className="todo-input"
        placeholder="Add new"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {newTodo && (
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      )}
    </div>
  );
};

export default TaskForm;
