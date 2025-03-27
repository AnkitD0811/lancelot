import React from "react";
import "./dashboard.css";
import { FaInfo, FaWrench, FaBell } from "react-icons/fa";



// For Websocket configuration
import { useState, useEffect } from "react";
import io from 'socket.io-client'

// For Map Plotting
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import mapPinIcon from './map_pin.png';
import "leaflet/dist/leaflet.css"


const ENDPOINT = 'ws://127.0.0.1:5000';
const socket = io.connect(ENDPOINT);


async function subscribeToTracker(deviceId) {
    const formData = new FormData();
    formData.append("deviceId", deviceId);

    try {
        const response = await fetch("/api/subscribeTo", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Subscription failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.text();
        console.log(result);
        // alert(`Subscribed to tracker ${deviceId}`);

    } catch (error) {
        console.error(`Error subscribing to tracker ${deviceId}:`, error);
        alert(`Failed to subscribe to tracker ${deviceId}`);
    }
}

function Dashboard() {

    const [coordinates, setCoordinates] = useState([51.505, -0.09]);
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);

    // Automatically subscribe when user is on dashboard page
    useEffect(() => {
        subscribeToTracker("5678"); //deviceId
    }, []);

    useEffect(() => {
        socket.on('receive_tracker_data_gps', (data) => {
            setCoordinates(() => data.geometry.coordinates);
        })
    }, [socket])

    useEffect(() => {
        socket.on('receive_tracker_data_temperature_humidity', (data) => {
            setTemperature(() => data.temperature);
            setHumidity(() => data.humidity);
        })
    }, [socket])

    useEffect(() => {
        console.log("Coordinates updated:", coordinates);
    }, [coordinates]);

    useEffect(() => {
        console.log("Temperature updated: ", temperature);
        console.log("Humidity updated: ", humidity);
    }), [temperature, humidity]


    // Trigger alarm function
    async function toggleAlarm(deviceId) {
        const formData = new FormData();
        formData.append("deviceId", deviceId);

        try {
            const response = await fetch("/api/triggerAlarm", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to toggle alarm: ${response.status} ${response.statusText}`);
            }

            const result = await response.text();
            console.log(result);

        } catch (error) {
            console.error(`Error toggling alarm for device ${deviceId}:`, error);
        }
    }


    // Recenter the map with the new coordinates
    function RecenterMap({ coordinates }) {
        const map = useMap(); // Access the map instance

        useEffect(() => {
            map.setView(coordinates, map.getZoom(), { animate: true });
        }, [coordinates, map]);

        return null;
    }

    // Map Icon
    const customIcon = new Icon({
        iconUrl: mapPinIcon,
        iconSize: [85, 85] // size of the icon
    });

    return (
        <div className="dashboard">

            <div className="map-container">

                <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <RecenterMap coordinates={coordinates} />

                    <Marker position={coordinates} icon={customIcon}>
                        <Popup>
                            Current Location
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>

            {/* Bottom Section */}
            <div className="bottom-section">
                <div className="circle">
                    <span className="value">{temperature}</span>
                    <span>Temperature</span>
                    <div className="fawrench"><FaWrench /></div>
                    <div className="fainfo"><FaInfo /></div>
                </div>

                <div className="circle">
                    <span className="value">{humidity}</span>
                    <span>Humidity</span>
                    <div className="fawrench"><FaWrench /></div>
                    <div className="fainfo"><FaInfo /></div>
                </div>

                <div className="circle">
                    <span>Gyroscope</span>
                    <div className="fainfo"><FaInfo /></div>
                </div>


                {/* literally the most important part of the code --------------------v----*/}
                <button className="toggle-alarm-button" onClick={() => toggleAlarm("5678")}>
                    <div className="fabell"><FaBell /></div>
                </button>


            </div>
        </div>
    );
}

export default Dashboard;
