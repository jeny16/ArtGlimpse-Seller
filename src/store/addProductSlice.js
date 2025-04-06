// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../action/api';

// // Async thunk to create a product
// export const createProduct = createAsyncThunk(
//   'addProduct/createProduct',
//   async (formData, thunkAPI) => {
//     try {
//       // Retrieve the stored user and extract the token
//       const storedUser = localStorage.getItem('user');
//       let token = '';

//       if (storedUser) {
//         try {
//           token = JSON.parse(storedUser)?.token || '';
//         } catch (error) {
//           console.error('Error parsing stored user:', error);
//           return thunkAPI.rejectWithValue('Invalid user data in localStorage.');
//         }
//       }

//       if (!token) {
//         return thunkAPI.rejectWithValue('Authentication token is missing.');
//       }

//       console.log('Token from localStorage:', token);

//       // Remove explicit Content-Type header so axios sets it automatically
//       const response = await axios.post('http://localhost:8081/api/seller/products', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true, // Ensure credentials are included
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Error adding product:', error);

//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to add product'
//       );
//     }
//   }
// );

// const addProductSlice = createSlice({
//   name: 'addProduct',
//   initialState: {
//     product: null,
//     isLoading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     resetAddProductState: (state) => {
//       state.product = null;
//       state.isLoading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProduct.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.product = action.payload;
//         state.success = true;
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export const { resetAddProductState } = addProductSlice.actions;
// export default addProductSlice.reducer;

// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../action/api';

// Create Product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData, thunkAPI) => {
    try {
      const storedUser = localStorage.getItem('user');
      let token = '';
      if (storedUser) {
        token = JSON.parse(storedUser)?.token || '';
      }
      if (!token) {
        return thunkAPI.rejectWithValue('Authentication token is missing.');
      }
      const response = await axios.post('http://localhost:8081/api/seller/products', formData, {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to add product'
      );
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, update }, thunkAPI) => {
    try {
      const storedUser = localStorage.getItem('user');
      let token = '';
      if (storedUser) {
        token = JSON.parse(storedUser)?.token || '';
      }
      if (!token) {
        return thunkAPI.rejectWithValue('Authentication token is missing.');
      }
      const response = await axios.patch(`http://localhost:8081/api/seller/products/${id}`, update, {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update product'
      );
    }
  }
);

const addProductSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetProductState: (state) => {
      state.product = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetProductState } = addProductSlice.actions;
export default addProductSlice.reducer;
