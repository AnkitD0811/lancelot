import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    deviceId: 0
}

export const selectedDeviceSlice = createSlice( {
    name: 'selectedDevice',
    initialState,
    reducers: {
        changeDevice: (state, action) => {
            
            state.deviceId = action.payload;
        },
        unselectDevice: (state) => {
            state.deviceId = 0;
        }
    }
})

export const { changeDevice, unselectDevice } = selectedDeviceSlice.actions;
export default selectedDeviceSlice.reducer;