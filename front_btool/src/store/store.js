// store.js
import { configureStore} from '@reduxjs/toolkit';
import { mainReducer } from './slices'; // Adjust this path

export const store = configureStore({
    reducer: {
        mySlice: mainReducer,
    },

});

export default store;
