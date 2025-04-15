import './DevicePlate.css';
import { Radio, Archive } from 'lucide-react';
import { useSelector } from 'react-redux';

import { changeDevice } from '../../app/features/selectedDevice';
import { useDispatch } from 'react-redux';

function DevicePlates({ device }) {

  const dispatch = useDispatch();
  const selectedState = useSelector((state) => state.selectedDevice.deviceId);

  const isSelected = selectedState === device.deviceId;

  const selectThisDevice = () => {
      dispatch(changeDevice(device.deviceId));
  }

  return (
    <div className={`device-plate ${isSelected ? 'selected' : ''}`} onClick={selectThisDevice} >
      <span className="device-name">Tracker {device.deviceName}</span>
      <div className="device-icons">
        <Archive size={30} />
        <Radio size={30} />
      </div>
    </div>
  );
}

export default DevicePlates;
