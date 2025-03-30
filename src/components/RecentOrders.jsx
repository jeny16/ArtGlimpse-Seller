import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Skeleton,
  Button
} from "@mui/material";
import { Refresh as RefreshIcon, KeyboardArrowRight as ArrowIcon } from "@mui/icons-material";
import { fetchOrders } from "../store/orderSlice";
import { ORDER_STATUS, getStatusChip } from "../components/ordersStatus";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [hoveredItem, setHoveredItem] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const sellerId = storedUser?.userId;

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchOrders(sellerId));
    }
  }, [dispatch, sellerId]);

  const handleRefresh = () => {
    if (sellerId) {
      dispatch(fetchOrders(sellerId));
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "1.1rem", color: "black" }}
        >
          Recent Orders
        </Typography>
        <Tooltip title="Refresh orders">
          <IconButton size="small" onClick={handleRefresh}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      {loading ? (
        <List disablePadding>
          {[...Array(3)].map((_, index) => (
            <ListItem key={`skeleton-${index}`} divider>
              <Skeleton variant="text" width="80%" height={24} />
            </ListItem>
          ))}
        </List>
      ) : error ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRefresh}
            sx={{ mt: 1 }}
          >
            Try Again
          </Button>
        </Box>
      ) : orders.length === 0 ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography>No recent orders found.</Typography>
          <Button variant="outlined" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Box>
      ) : (
        <List disablePadding>
          {orders.map((order, index) => (
            <ListItem
              key={order._id || order.id || `order-${index}`}
              divider
              onMouseEnter={() =>
                setHoveredItem(order._id || order.id || index)
              }
              onMouseLeave={() => setHoveredItem(null)}
              sx={{ cursor: "pointer" }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={5}>
                  <ListItemText
                    primary={
                      <Typography fontWeight={500}>
                        {order.title || `Order #${order.orderRef}`}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {order.shippingAddress?.name || "No customer name"}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  {getStatusChip(order.paymentStatus)}
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography fontWeight="medium">
                    ₹{order.totalAmount}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={1} sx={{ textAlign: "right" }}>
                  <Tooltip title="View details">
                    <IconButton size="small">
                      <ArrowIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RecentOrders;
