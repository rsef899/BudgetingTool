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

export const fetchNetBalance = createAsyncThunk(
    'items/fetchNetBalance',
    async () => {
        const response = await fetch("http://localhost:5000/api/get_netBalance");
        const data = await response.json();
        return data;
    }
)

// Define an initial state
const initialState = {
  items: [],
  netBalance: 0,
  editingCell: null
};

const slice = createSlice({
    name: 'mySlice',
    initialState: initialState,
    reducers: {
        set_items: (state, action) => {
            state.items = action.payload;
        },
        set_net_balance: (state, action) =>{
            state.netBalance = action.payload;
        },
        startEditing: (state, action) => {
            state.editingCell = action.payload; // Payload should have cell identifier
          },
        stopEditing: (state) => {
        state.editingCell = null;
        },
    },
    //Used to handle the table async thunk
    extraReducers: (builder) => {
        builder
        .addCase(fetchItems.fulfilled, (state, action) => {
            // handle the fulfilled state
            state.items = action.payload;
        })
        builder.addCase(fetchNetBalance.fulfilled, (state, action) => {
            // handle the fulfilled state
            state.netBalance = action.payload.netBalance;
        })
    },
});

export const { set_items, set_net_balance, startEditing, stopEditing } = slice.actions
export const mainReducer = slice.reducer; // Export the reducer as named export
