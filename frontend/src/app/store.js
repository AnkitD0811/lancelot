import { configureStore } from "@reduxjs/toolkit";

import { deviceListSlice } from "./features/deviceList";

export const store = configureStore({
    reducer: {
        deviceList: deviceListSlice.reducer,    
    },
})