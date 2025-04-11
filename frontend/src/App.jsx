import React from "react";
import { Routes, Route } from "react-router-dom";


// Import Pages
import LiveDashboard from "./pages/LiveDashboard";


function App() {
    return (
            <Routes>
                <Route path="/live" element={<LiveDashboard />} />
            </Routes>
        );
}

export default App;
