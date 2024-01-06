// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { itemsReducer } from './slices'; // Adjust this path

export const store = configureStore({
    reducer: {
        items: itemsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
