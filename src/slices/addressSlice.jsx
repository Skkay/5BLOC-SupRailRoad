import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        value: '',
    },
    reducers: {
        setAddress: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;
