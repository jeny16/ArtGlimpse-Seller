import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import inventorySlice from './inventorySlice';
import addProductReducer from './addProductSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        inventory: inventorySlice,
        addProduct: addProductReducer,
    },
})

export default store;