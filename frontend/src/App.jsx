import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import About from "./components/about";
import Home from "./components/home";
import TrackerMenu from "./components/trackermenu";
import Settings from "./components/settings";

function App() {
    return (
        <div>
            <NavBar/>
            <TrackerMenu />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
