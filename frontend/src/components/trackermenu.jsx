import React from "react";
import { NavLink } from "react-router-dom";
import "./trackermenu.css";
import { FaPlus } from "react-icons/fa";

function TrackerMenu() {
    // Hardcoded number of trackers (will be replaced with API call later)
    const numTrackers = 3;
    
    // Use a for loop to build the trackers array
    const trackerItems = [];
    for (let i = 1; i <= numTrackers; i++) {
        trackerItems.push(
            <li key={i} className="tracker-item">
                <NavLink to={i === 1 ? "/dashboard" : "/"} className="tracker-link">
                    Tracker {i}
                </NavLink>
            </li>
        );
    }

    return (
        <nav className="trackerbar">
            <ul className="trackerbar-tracker">
                {trackerItems}
                <li className="tracker-item">
                    <NavLink to="/addtracker" className="tracker-link">
                        <FaPlus/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default TrackerMenu;
