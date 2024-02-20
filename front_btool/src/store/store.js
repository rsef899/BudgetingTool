// store.js
import { configureStore} from '@reduxjs/toolkit';
import { mainReducer } from './slices'; // Adjust this path
import { pcsReducer } from './PCslices';

export const store = configureStore({
    reducer: {
        mySlice: mainReducer,
        pcSlice: pcsReducer
        
    },

});

export default store;
