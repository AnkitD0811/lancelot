import React from "react";
import { NavLink } from "react-router-dom";
import "./trackermenu.css";

function TrackerMenu() {
    return (
        <nav className="trackerbar">
            <ul className="trackerbar-tracker">
                <li className="tracker-item">
                <NavLink to="/dashboard" className="tracker-link">
                        Tracker 1
                    </NavLink>
                </li>
                <li className="tracker-item">
                    <NavLink to="/" className="tracker-link">
                        Tracker 2
                    </NavLink>
                </li>
                <li className="tracker-item">
                    <NavLink to="/" className="tracker-link">
                        Tracker 3
                    </NavLink>
                </li>
                <li className="tracker-item">
                    <NavLink to="/" className="tracker-link">
                        Tracker 4
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default TrackerMenu;
