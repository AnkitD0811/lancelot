import React from "react";
import "./dashboard.css";
function Dashboard() {
    return (
        <div className="dashboard">

            <div className="map-container">
                <p style={{ textAlign: "center", paddingTop: "18%" }}>MAP</p>
            </div>

            {/* Bottom Section */}
            <div className="bottom-section">
                <div className="circle">
                    <span>Temp</span>
                </div>

                <div className="circle">
                    <span>Humidity</span>
                </div>

                <div className="circle">
                    <span>Gyro</span>
                </div>

                <div className="circle">
                    <span>Alarm</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
