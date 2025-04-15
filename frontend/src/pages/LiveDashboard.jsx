

// Components
import Navbar from "../components/Global/Navbar";
import TrackerSelector from "../components/LiveDashboard/TrackerSelector";
import AddTrackerButton from "../components/LiveDashboard/AddTrackerButton";
import AlarmSwitch from "../components/LiveDashboard/AlarmSwitch";
import SettingsButton from "../components/LiveDashboard/SettingsButton";

function LiveDashboard()
{
    return <div style={ { height: "100%", width: "100%"}}>

        <Navbar />  

        <div style={{height: "90%", width: "100%", display: "flex", flexDirection: "row"}}>

            <div className="panel left" style={{height: "100%", width: "40%"}}>   

                <TrackerSelector />
                <AddTrackerButton />

                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", top: "15%", width: "50%", left: "25%"}}>
                    <AlarmSwitch />
                    <SettingsButton />
                </div>
                

            </div>


            <div className="panel right" style={{height: "100%", width: "60%"}}>

            </div>

        </div>

        

    </div>
}



export default LiveDashboard;