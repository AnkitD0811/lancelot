import React from "react";
import "./home.css";

function Home() {
    return (
        <div className="home">
            <div className="textbox">
                <h1>Welcome to the Package Tracking System</h1>
                <p>Select an option from the sidebar to navigate.</p>
                <p>Go to <b>dashboard</b> to track your package.</p>
                <h3>Happy Tracking!</h3>
            </div>
        </div>
    );
}

export default Home;
