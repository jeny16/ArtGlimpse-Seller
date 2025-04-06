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
import axios from 'axios';
import { storage } from '../appwrite/appwriteConfig';
import { ID, Permission, Role } from 'appwrite'; // ✅ Import this to use ID.unique()

// Async function to upload image to Appwrite
const uploadImageToAppwrite = async (file) => {
  try {
    const response = await storage.createFile(
      '67f226020009ef702b5c', // Your bucket ID
      ID.unique(),
      file,
      [Permission.read(Role.any())] 
    );
    console.log('✅ File uploaded:', response);
    return response.$id;
  } catch (error) {
    console.error('❌ Appwrite storage error:', error);
    throw new Error('Image upload failed: ' + error.message);
  }
};

// Create product thunk
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData, thunkAPI) => {
    try {
      // Process each key that starts with 'image_'
      // Collect all file IDs from Appwrite
      const imageFileIds = [];
      for (let pair of formData.entries()) {
        const key = pair[0];
        const value = pair[1];
        if (key.startsWith('image_') && value instanceof File) {
          const fileId = await uploadImageToAppwrite(value);
          imageFileIds.push(fileId);
          formData.delete(key);
        }
      }
      // Append all file IDs to the formData under 'images'
      imageFileIds.forEach((id) => formData.append('images', id));

      // Log form data for debugging
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Get token and userId from localStorage (if needed for backend call)
      const storedUser = localStorage.getItem('user');
      let token = '';
      let userId = '';
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser?.token || '';
        userId = parsedUser?.userId || '';
      }

      const response = await axios.post(
        `http://localhost:8081/products?sellerId=${userId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add product'
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
        state.product = action.payload;
        state.isLoading = false;
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


export const { resetAddProductState } = addProductSlice.actions;
export default addProductSlice.reducer;
