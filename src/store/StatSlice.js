import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStats = createAsyncThunk("stats/fetchStats", async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token; // Make sure token is available

    const response = await fetch("http://localhost:8081/api/stats", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add the token here
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch stats");
    }

    return await response.json();
});

  

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    stats: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
