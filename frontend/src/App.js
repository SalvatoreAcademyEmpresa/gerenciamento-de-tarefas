import React from "react";
import TodoList from "./components/TodoList";
import Header from "./layout/Header";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <TodoList />
      <Header />
    </div>
  );
}

export default App;
