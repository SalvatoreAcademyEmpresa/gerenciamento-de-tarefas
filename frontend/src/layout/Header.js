import React, { useState } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <nav className="header">
        <button className="menu-toggle" onClick={toggleMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="black"
              d={
                isExpanded
                  ? "M19 13H5v-2h14v2z"
                  : "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              }
            />
          </svg>
        </button>

        <div className="header-title">Todo List v07</div>
      </nav>

      <aside className={`side-menu ${isExpanded ? "expanded" : ""}`}>
        <div className="user-profile">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>

        <footer className="mini-footer">
          <p>© 2024 Futuristic Todo List.</p>
        </footer>
      </aside>
    </div>
  );
};

export default Header;
