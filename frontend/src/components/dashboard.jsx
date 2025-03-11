import React from "react";
import "./dashboard.css";
import { FaInfo } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";

// For Websocket configuration
import { useState, useEffect } from "react";
import io from 'socket.io-client'

// For Map Plotting
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const ENDPOINT = 'ws://127.0.0.1:5000';
const socket = io.connect(ENDPOINT)

function Dashboard() {

    return (
        <div className="dashboard">

            <div className="map-container">

                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

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
