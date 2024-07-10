import React from "react";
import "./css/App.css";
import TodoList from "./components/TodoList";
import Header from "./layout/Header";

function App() {
  return (
    <div className="App">
      <TodoList /> {/* Componente principal da aplicação */}
      <Header />
    </div>
  );
}

export default App;
