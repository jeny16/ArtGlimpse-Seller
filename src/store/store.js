import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import inventorySlice from './inventorySlice';
import addProductReducer from './addProductSlice'
import statsReducer from './StatSlice'
const store = configureStore({
    reducer: {
        auth: authSlice,
        inventory: inventorySlice,
        addProduct: addProductReducer,
        stats: statsReducer,
    },
})

export default store;