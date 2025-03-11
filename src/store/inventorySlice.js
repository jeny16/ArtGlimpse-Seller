import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inventoryService from "../action/inventoryService";

const initialState = {
    inventoryItems: [],
    inventoryItem: null,
    isLoading: false,
    error: null,
};

export const fetchInventory = createAsyncThunk(
    "inventory/fetchAll",
    async (_, thunkAPI) => {
        try {
            return await inventoryService.getInventory();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        clearInventory: (state) => {
            state.inventoryItem = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.inventoryItems = action.payload;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearInventory } = inventorySlice.actions;
export default inventorySlice.reducer;