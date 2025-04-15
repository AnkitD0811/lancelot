import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    length: 0,
    dlist: []
}

export const deviceListSlice = createSlice( {
    name: 'deviceList',
    initialState,
    reducers: {
        add: (state, action) => {
            
                state.length += 1;
            const list = state.dlist;
            list.push(action.payload);
            state.dlist = list;

        },
        remove: (state, action) => {
            
            const id= action.payload;
            state.length -= 1;
            state.dlist = state.dlist.filter(device => device.deviceId !== id);
        }
        
    }
})

export const { add, remove } = deviceListSlice.actions;
export default deviceListSlice.reducer;