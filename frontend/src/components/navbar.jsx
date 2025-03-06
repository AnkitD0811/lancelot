import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
