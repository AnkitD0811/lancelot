import React from "react";
import "./about.css";

function About() {
    return (
        <div className="about">
            <div className="textbox">
                <h1>About</h1>
                <p>
                    We are three third-year Computer Science students who have developed an
                    Automatic Package Tracker to address the critical challenges of modern logistics.
                    Our product integrates advanced sensors and IoT technologies to provide real-time
                    monitoring of packages, ensuring they remain safe and secure throughout their journey.
                    By focusing on ease of use, cost-effectiveness, and reliability, we aim to support
                    e-commerce businesses, couriers, and individuals who require enhanced visibility and
                    protection for their shipments.
                </p>
                <ul>
                    <li>Real-time GPS tracking and orientation monitoring for accurate, proactive alerts.</li>
                    <li>Temperature and moisture sensors to safeguard sensitive or perishable items.</li>
                    <li>Security features that detect tampering or unauthorized access.</li>
                    <li>Scalable design suitable for both small businesses and large logistics operations.</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
