import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import menuIcon from "../assets/img/menu.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  // faSearch,
  // faInbox,
  // faCalendarDay,
  // faTrashCan,
  faSync,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(
    () => JSON.parse(localStorage.getItem("isOfflineMode")) ?? true
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isOfflineMode", JSON.stringify(isOfflineMode));
  }, [isOfflineMode]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode);
    if (isOfflineMode) {
      alert("You are now in online mode.");
      navigate("/online");
    } else {
      alert("You are now in offline mode.");
      navigate("/");
    }
  };

  const resetApp = () => {
    localStorage.removeItem("tasks");
    localStorage.removeItem("title");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <nav className="header">
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
        </button>
        <div className="header-title">
          {isOfflineMode
            ? "Futuristic Todo List | v1.0.2"
            : "Futuristic Todo List | Version in Development Phase"}
        </div>
      </nav>

      <aside className={`side-menu ${isExpanded ? "expanded" : ""}`}>
        <div className="user-profile">
          <FontAwesomeIcon icon={faUserCircle} size="3x" />
          <span className="user-name">User</span>
        </div>

        <ul className="menu-items">
          <li>
            <button
              className={`offline-mode-button ${
                isOfflineMode ? "offline" : ""
              }`}
              onClick={toggleOfflineMode}
            >
              <FontAwesomeIcon icon={faSync} />
              {isOfflineMode ? "Enable Online Mode" : "Enable Offline Mode"}
            </button>
          </li>

          {isOfflineMode && (
            <li>
              <button className="reset-button" onClick={resetApp}>
                <FontAwesomeIcon icon={faEraser} /> Reset Tasks and Title
              </button>
            </li>
          )}

          {/* TODO: <li>
            <button className="add-task-button">
              <FontAwesomeIcon icon={faInbox} /> Add task
            </button>
          </li>

          <li>
            <FontAwesomeIcon icon={faSearch} />
            <span>Search</span>
          </li>

          <li>
            <FontAwesomeIcon icon={faCalendarDay} />
            <span>Reminder</span>
          </li>

          <li>
            <FontAwesomeIcon icon={faTrashCan} />
            <span>Bin</span>
          </li> */}
        </ul>

        <footer className="mini-footer">
          <a href="https://github.com/SalvatoreAcademyEmpresa/gerenciamento-de-tarefas">
            <span>© 2024 Futuristic Todo List.</span>
          </a>
        </footer>
      </aside>
    </div>
  );
};

export default Header;
