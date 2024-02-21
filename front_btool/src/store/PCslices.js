import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchPCs = createAsyncThunk(
    'PcPage/fetchPCs',
    async () => {
        const response = await fetch("http://localhost:5000/api/fetch_pcs");
        const data = await response.json();
        return data;
    }
);

// Define an initial state
const initialState = {
    pcs: [],
    selectedPC: null,
    loading: false,
    error: null
};
  
const pcsSlice = createSlice({
    name: 'pcs',
    initialState: initialState,
    reducers: {
        selectPC: (state, action) => {
            state.selectedPC = action.payload;
        }
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(fetchPCs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPCs.fulfilled, (state, action) => {
            state.loading = false;
            state.pcs = action.payload;
        })
        .addCase(fetchPCs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});
  
export const { selectPC } = pcsSlice.actions;
export const pcsReducer = pcsSlice.reducer; // Export the reducer as named export