
import './TrackerSelector.css';

import DevicePlates from './DevicePlate';

import { useSelector } from 'react-redux';


function TrackerSelector()
{

    const list = useSelector((state) => state.deviceList.dlist);




    return <div id='trackerselector'>
        <p>Tracker List</p>
        <hr style={{ width: "20%", height: "1px", textAlign: "center", backgroundColor: "white"}}></hr>
            <div id='listholder'>

                { list.length > 0 ? 
                ( 
                        list.map((device, idx) => <DevicePlates key={idx} device={device} />)
                ) : (
                    <p>No devices</p>
                )
                }

            </div>
    </div>
}

export default TrackerSelector;