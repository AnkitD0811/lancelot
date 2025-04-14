

// Components
import Navbar from "../components/Navbar";
import TrackerSelector from "../components/TrackerSelector";
import AddTrackerButton from "../components/AddTrackerButton";

function LiveDashboard()
{
    return <div style={ { height: "100%", width: "100%"}}>

        <Navbar />  

        <div style={{height: "90%", width: "100%", display: "flex", flexDirection: "row"}}>

            <div className="panel left" style={{height: "100%", width: "40%"}}>   

                <TrackerSelector />
                <AddTrackerButton />

            </div>


            <div className="panel right" style={{height: "100%", width: "60%"}}>

            </div>

        </div>

        

    </div>
}



export default LiveDashboard;