import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoListOff from "./components/TodoListOff";
import Header from "./layout/Header";
import "./css/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {" "}
          <Route path="/" element={<TodoList />} />{" "}
          <Route path="/offline" element={<TodoListOff />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
