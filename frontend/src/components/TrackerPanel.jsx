
import { useState } from 'react';
import './trackerpanel.css';


const device = (id, status) => {

    console.log(status);
    return <div>
        <p>Tracker {id}</p>
    </div>
}



function TrackerPanel()
{

    const[deviceList, setList] = useState([]);

    const addDeviceProcess = () => {
        const devId = prompt("enter Device Id");
        setList([...deviceList, { id: devId, status: 'ok'}]);
    }
    
    return <div id="trackerpanel">

        <div id='upper'>
            <p>Tracker List</p>

            <div id="devicelist">

            { deviceList.length > 0 ? deviceList.map( dev => 

                device(dev.id, dev.status)

            ) : <p>No Tracker Added Yet</p> }
            </div>
        </div>

        

        <button id='addtracker' onClick={addDeviceProcess}>Add Tracker</button>

    </div>
}

export default TrackerPanel;