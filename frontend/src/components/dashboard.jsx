import React from "react";
import "./dashboard.css";
import { FaInfo } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";

function Dashboard() {
    return (
        <div className="dashboard">

            <div className="map-container">
                <p style={{ textAlign: "center", paddingTop: "15%" }}>MAP</p>
            </div>

            {/* Bottom Section */}
            <div className="bottom-section">
                <div className="circle">
                    <span>Temp</span>
                    <div className="fawrench"><FaWrench/></div>
                    <div className="fainfo"><FaInfo /></div>
                </div>

                <div className="circle">
                    <span>Humidity</span>
                    <div className="fawrench"><FaWrench/></div>
                    <div className="fainfo"><FaInfo /></div>
                </div>

                <div className="circle">
                    <span>Gyro</span>
                    <div className="fawrench"><FaWrench/></div>
                    <div className="fainfo"><FaInfo /></div>
                </div>

                <div className="circle">
                    <span>Alarm</span>
                    <div className="fainfo"><FaInfo /></div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
