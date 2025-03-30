import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for store details
const BASE_URL = 'http://localhost:8081/api/seller';

// Fetch store details by sellerId
export const fetchStoreDetails = createAsyncThunk(
  'storeDetails/fetch',
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/store`, {
        params: { userId: sellerId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch store details');
    }
  }
);

// Update store details
export const updateStoreDetails = createAsyncThunk(
  'storeDetails/update',
  async ({ sellerId, storeDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/store`, storeDetails, {
        params: { userId: sellerId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update store details');
    }
  }
);

// Store slice
const storeDetailsSlice = createSlice({
  name: 'storeDetails',
  initialState: {
    details: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStoreDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchStoreDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(updateStoreDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStoreDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(updateStoreDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export default storeDetailsSlice.reducer;
