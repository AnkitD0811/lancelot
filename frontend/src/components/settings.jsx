import React, { useState, useEffect } from "react";
import "./settings.css";
import { FaMoon, FaSun } from "react-icons/fa";
function Settings() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        // Update data-theme attribute on root element
        document.documentElement.setAttribute(
            "data-theme",
            newMode ? "dark" : "light"
        );

        // Save preference
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    return (
        <div className="settings">
            <div className="textbox">
                <h1>User Settings</h1>
                <p>View and edit your settings here.</p>
                <p>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}

                </button>
            </div>
        </div>
    );
}

export default Settings;
