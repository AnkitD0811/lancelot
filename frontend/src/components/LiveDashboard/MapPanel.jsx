import { Radio } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function MapPanel() {
    const position = [28.6139, 77.2090];

    return (
        <div
            style={{
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "55%",
                top: "5%",
                borderRadius: "10px",
            }}
        >
            <p className="text-lg font-semibold flex items-center gap-2 text-white mb-2">
                <Radio /> Live View
            </p>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "90%", width: "100%", borderRadius: "8px", borderColor: "#578E7E", borderWidth: "5px", borderStyle: "solid"}}
            >
                <ChangeView center={position} zoom={13} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>You are here</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapPanel;
