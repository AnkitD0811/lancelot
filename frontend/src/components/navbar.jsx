import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';
import { FaInfo } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import logo from '../assets/logo.jpg';

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Website Name (Left Side) */}
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <span className="brand-name">Tagged</span>
        </div>


        {/* Navigation Links (Right Side) */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
