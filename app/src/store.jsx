import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './slices/addressSlice';

export default configureStore({
    reducer: {
        address: addressReducer,
    },
});
