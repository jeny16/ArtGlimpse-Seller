import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/seller';

// GET seller profile
export const fetchSellerProfile = createAsyncThunk(
  'sellerProfile/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

// UPDATE seller profile
export const updateSellerProfile = createAsyncThunk(
  'sellerProfile/update',
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/profile`, profileData, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update profile');
    }
  }
);

// Slice
const sellerProfileSlice = createSlice({
  name: 'sellerProfile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(updateSellerProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export default sellerProfileSlice.reducer;
