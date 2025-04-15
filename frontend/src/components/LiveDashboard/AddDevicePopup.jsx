
import './AddDevicePopup.css';
import { add } from '../../app/features/deviceList';
import { useDispatch } from 'react-redux';


const PopupForm = ({ isOpen, onClose }) => {
  
    const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic here (e.g., send form data)
    console.log('Form submitted');
    console.log(e.target.deviceId.value);

    const deviceId = e.target.deviceId.value;
    const deviceName = e.target.deviceName.value;

    const devObj = {deviceId: deviceId, deviceName: deviceName};

    dispatch(add(devObj));

    // Close the popup
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
  <div className="popup-content">
    <button className="close-button" onClick={onClose}>
      ✕
    </button>
    <h2>Popup Form</h2>
    <form className="popup-form" onSubmit={handleSubmit}>
     
      <label>
        Device ID:
        <input type="text" name="deviceId" required />
      </label>
      <label>
        Device Name:
        <input type="text" name="deviceName" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

      )}
    </>
  );
};

export default PopupForm;