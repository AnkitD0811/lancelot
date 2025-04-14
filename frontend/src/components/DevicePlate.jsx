import './DevicePlate.css';
import { Radio, Archive} from 'lucide-react'; // or use any icon lib

function DevicePlates({ device }) {
  return (
    <div className="device-plate">
      <span className="device-name">Tracker {device.deviceName}</span>
      <div className="device-icons">
        <Archive size={18} />
        <Radio size={18} />
      </div>
    </div>
  );
}

export default DevicePlates;
