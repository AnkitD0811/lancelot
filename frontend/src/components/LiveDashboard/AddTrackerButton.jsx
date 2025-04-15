import PopupForm from "./AddDevicePopup";
import { useState } from "react";


import './AddTrackerButton.css';

function AddTrackerButton()
{
    const [popState, setPop] = useState(false);


    const addTracker = () => {
        setPop(true);
    }

    const onClose = () => {
        setPop(false);
    }

    return <>
        <button onClick={addTracker} id="mainbutton"> Add Tracker </button>
        <PopupForm isOpen={popState} onClose={onClose}/>    
    </>
}

export default AddTrackerButton;