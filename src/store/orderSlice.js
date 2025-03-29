import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "date-fns";

// Helper function to safely extract string IDs
const extractId = (idField) => {
  if (typeof idField === "object" && idField !== null) {
    return idField.$oid || String(idField);
  }
  return idField;
};

// Thunk to fetch orders using sellerProfileId
export const fetchOrders = createAsyncThunk("orders/fetch", async (_, thunkAPI) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const sellerId = storedUser?.sellerId;

    if (!token || !sellerId) {
      return thunkAPI.rejectWithValue("Missing authentication or seller ID.");
    }

    const response = await axios.get(`http://localhost:8081/api/ordersList/recent/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch");
  }
});

// Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Unauthorized: No token found.");
      }

      const response = await axios.patch(
        `http://localhost:8081/api/ordersList/${orderId}`,
        { paymentStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update status");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.map((order) => ({
          ...order,
          id: extractId(order.id),
          sellerId: extractId(order.sellerId),
          userId: extractId(order.userId),
          createdAt: order.createdAt ? format(new Date(order.createdAt), "yyyy-MM-dd HH:mm:ss") : null,
          items: order.items.map((item) => ({
            ...item,
            productId: extractId(item.productId),
          })),
        }));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((order) => order.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            paymentStatus: updatedOrder.paymentStatus,
          };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrderStatus = (state) => state.orders.status;

export default orderSlice.reducer;
