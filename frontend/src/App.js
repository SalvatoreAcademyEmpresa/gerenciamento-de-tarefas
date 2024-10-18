import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoListOff from "./components/AppOff/components/TodoListOff";
import Header from "./layout/Header";
import "./css/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TodoListOff />} />{" "}
          <Route path="/online" element={<TodoList />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
