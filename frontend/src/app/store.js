import { configureStore } from "@reduxjs/toolkit";

import { deviceListSlice } from "./features/deviceList";
import { selectedDeviceSlice } from "./features/selectedDevice";

export const store = configureStore({
    reducer: {
        deviceList: deviceListSlice.reducer,
        selectedDevice: selectedDeviceSlice.reducer,    
    },
})