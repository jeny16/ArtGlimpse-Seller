import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import orderService from "../action/orderService";

// Helper function to safely extract string IDs
const extractId = (idField) => {
  if (typeof idField === "object" && idField !== null) {
    return idField.$oid || String(idField);
  }
  return idField;
};

// Thunk to fetch orders using orderService
export const fetchOrders = createAsyncThunk("orders/fetch", async (_, thunkAPI) => {
  try {
    const data = await orderService.fetchOrders();
    console.log("response inside fetchOrders:", data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Thunk to update order status using orderService
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const data = await orderService.updateOrderStatus({ orderId, newStatus });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        // Log the state as a plain object rather than a Proxy
        console.log("order inside fetchOrders:", JSON.parse(JSON.stringify(state)));
        state.orders = action.payload.map((order) => ({
          ...order,
          id: extractId(order.id),
          sellerId: order.sellerId ? extractId(order.sellerId) : null,
          userId: extractId(order.userId),
          // Use the new orderStatus field; if missing, default based on paymentStatus
          status: order.orderStatus ? order.orderStatus : (order.paymentStatus === "PAID" ? "New" : "Processing"),
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
        const index = state.orders.findIndex((order) => order.id === extractId(updatedOrder.id));
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            status: updatedOrder.orderStatus,
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
