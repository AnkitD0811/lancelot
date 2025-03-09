import React, { useState } from "react";
import "./addtracker.css";

function AddTracker() {
    const [formData, setFormData] = useState({
        deviceId: "",
        deviceName: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('deviceId', formData.deviceId);
            formDataToSend.append('deviceName', formData.deviceName);

            const response = await fetch("/api/subscribeTo", {
                method: "POST",
                body: formDataToSend, 
            });

            if (response.ok) {
                const result = await response.text(); 
                console.log("Tracker added successfully:", result);
                alert("Tracker added successfully!");
                setFormData({ deviceId: "", deviceName: "" }); 
            } else {
                console.error("Failed to add tracker");
                alert("Failed to add tracker. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="addtracker">
            <div className="textbox">
                <h2>Add a Tracker</h2>
                <form onSubmit={handleSubmit}>
                    <label>Device Name:</label>
                    <input
                        type="text"
                        name="deviceName"
                        value={formData.deviceName}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label>Device ID:</label>
                    <input
                        type="text"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Add Tracker</button>
                </form>
            </div>
        </div>
    );
}

export default AddTracker;
