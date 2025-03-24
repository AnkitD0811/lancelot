import React from "react";
import "./dashboard.css";
import { FaInfo } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";

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


function Dashboard() {

    const [coordinates, setCoordinates] = useState([51.505, -0.09]);
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);

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
                    <span>{temperature}</span>
                    <div className="fawrench"><FaWrench/></div>
                    <div className="fainfo"><FaInfo /></div>
                </div>

                <div className="circle">
                    <span>{humidity}</span>
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
