import React from "react";
import "./dashboard.css";
import { FaInfo } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { useState, useEffect } from "react";
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'ws://127.0.0.1:5000';

function Dashboard() {

    const [ response, setResponse ] = useState('');
    const [ message, setMessage ] = useState('');

    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Server');
        })

        socket.on('response', (msg) => {
            console.log(msg.data);
            setResponse(msg.data);
        })

        return () => {socket.disconnect();};
    }, [socket]);

    const h = "hello World";
    const sendMessage = () => {
        socket.emit('message', { h });
    };
    

    return (
        <div className="dashboard">

            <div className="map-container">
                <p style={{ textAlign: "center", paddingTop: "15%" }}>Response : {response}</p>
                <button onClick={sendMessage}>Press Me Daddy</button>
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
