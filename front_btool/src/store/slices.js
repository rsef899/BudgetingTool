import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching items
export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async () => {
        const response = await fetch("http://localhost:5000/api/fetch_items");
        const data = await response.json();
        return data;
    }
);

// Define an initial state
const initialState = {
  items: [],
};

const itemsSlice = createSlice({
    name: 'mySlice',
    initialState: initialState,
    reducers: {
        set_items: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            // handle the fulfilled state
            state.items = action.payload;
        });
        // handle pending and rejected states if necessary
    },
});

export const { sliceActions } = itemsSlice.actions; // Export the actions as named export
export const itemsReducer = itemsSlice.reducer; // Export the reducer as named export
