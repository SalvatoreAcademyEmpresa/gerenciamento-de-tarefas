import React, { useState } from "react";
import "../css/Header.css";
import menuIcon from "../assets/img/menu.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSearch,
  faInbox,
  faCalendarDay,
  faClock,
  faTags,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <nav className="header">
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
        </button>

        <div className="header-title"> Futuristic Todo List | v1.0.0</div>
      </nav>

      <aside className={`side-menu ${isExpanded ? "expanded" : ""}`}>
        <div className="user-profile">
          <FontAwesomeIcon icon={faUserCircle} size="3x" />
          <span className="user-name">User</span>
        </div>

        <ul className="menu-items">
          <li>
            <button className="add-task-button">
              <FontAwesomeIcon icon={faInbox} /> Add task
            </button>
          </li>

          <li>
            <FontAwesomeIcon icon={faSearch} />
            <span>Search</span>
          </li>

          <li>
            <FontAwesomeIcon icon={faInbox} />
            <span>Inbox</span>
          </li>

          <li>
            <FontAwesomeIcon icon={faCalendarDay} />
            <span>Reminder</span>
          </li>

          <li>
            <FontAwesomeIcon icon={faTrashCan} />
            <span>Bin</span>
          </li>

          {/* TODO: <li>
            <FontAwesomeIcon icon={faTags} />
            <span>Filters & Labels</span>
          </li> */}
        </ul>

        {/* TODO: <div className="projects-section">
          <h3>My Projects</h3>
          <ul className="projects-list"></ul>
        </div> */}

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
