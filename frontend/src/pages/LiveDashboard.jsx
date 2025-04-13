

// Components
import Navbar from "../components/Navbar";
import TrackerPanel from "../components/TrackerPanel";
import MapPanel from "../components/MapPanel";
import DataGraph from "../components/DataGraph";

function LiveDashboard()
{
    return <div style={ { height: "100%", width: "100%"}}>

        <Navbar />  
        <TrackerPanel />
        <MapPanel />

        <DataGraph />

    </div>
}



export default LiveDashboard;