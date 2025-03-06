import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/navbar"; // Assuming navbar.jsx is Sidebar
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import About from "./components/about";
import Home from "./components/home";
import "./App.css"; // Import CSS

function App() {
    return (
        <div>
            <SideBar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
