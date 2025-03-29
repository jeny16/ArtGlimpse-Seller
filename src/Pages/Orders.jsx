import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  updateOrderStatus,
  selectOrders,
} from "../store/orderSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  CircularProgress,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Button,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  TablePagination,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  HourglassEmpty as PendingIcon,
  Receipt as ReceiptIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import OrderDetails from '../components/OrderDetails';
import { ORDER_STATUS, getStatusChip }  from '../components/ordersStatus';


const calculateTotal = (items) => {
  if (!items || !Array.isArray(items)) return "0.00";
  return items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
};

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  // UI state
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Tab labels with counts
  const tabLabels = [
    "All Orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Pending",
    "Cancelled",
  ];

  // Fetch orders when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.userId || storedUser?.id;
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [dispatch]);

  // Handle tab change and reset pagination
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(0);
    setSearchTerm("");
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Filtered orders based on current tab and search term
  const filteredOrders = React.useMemo(() => {
    let filtered = [...orders];
    
    // Filter by tab
    if (currentTab !== 0) {
      const statusFilter = tabLabels[currentTab];
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(order => {
        // Search by order ID
        if (order.id && order.id.toString().toLowerCase().includes(search)) {
          return true;
        }
        
        // Search by customer name
        if (order.shippingAddress?.name && 
            order.shippingAddress.name.toLowerCase().includes(search)) {
          return true;
        }
        
        // Search by product names
        if (order.items && Array.isArray(order.items)) {
          return order.items.some(item => 
            item.productName && item.productName.toLowerCase().includes(search)
          );
        }
        
        return false;
      });
    }
    
    return filtered;
  }, [orders, currentTab, tabLabels, searchTerm]);

  // Paginated orders
  const paginatedOrders = React.useMemo(() => {
    return filteredOrders.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredOrders, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.userId || storedUser?.id;
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));

    // If changing from detail dialog, update the selected order
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
      });
    }
  };

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  // Render loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress sx={{ color: "#00A5AF", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Loading your orders...
        </Typography>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, bgcolor: "#FFF3F3", borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" color="error" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <CloseIcon sx={{ mr: 1 }} />
            Error Loading Orders
          </Typography>
          <Typography color="error.dark" sx={{ mb: 2 }}>
            {typeof error === "object" ? JSON.stringify(error) : error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ borderRadius: 2 }}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
    {/* Header */}
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          fontWeight="bold"
          sx={{ 
            color: (theme) => theme.palette.primary.highlight, // Changed to theme color
            display: "flex",
            alignItems: "center"
          }}
        >
          <ReceiptIcon sx={{ mr: 1 }} />
          Order Management
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh Orders">
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{
                borderRadius: 2,
                backgroundColor: "custom.main", // Keeping original accent color
                "&:hover": {
                  backgroundColor: "custom.highlight",
                },
              }}
            >
              Refresh
            </Button>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Search and filter bar */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        mb: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}>
        <TextField
          placeholder="Search orders..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
          sx={{ minWidth: { xs: '100%', sm: 300 } }}
        />
      </Box>

      {/* Tabs for quick navigation with theme colors */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        sx={{
          mb: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: (theme) => theme.palette.custom.highlight, // Changed to theme color
          },
          "& .Mui-selected": {
            color: (theme) => `${theme.palette.custom.highlight} !important`, // Changed to theme color
            fontWeight: "bold",
          },
          "& .MuiTab-root": {
            color: "#757575", // Default tab color
            transition: "all 0.2s ease",
            borderRadius: 1.5,
            minHeight: "48px",
            "&:hover": {
              color: (theme) => theme.palette.custom.accent, // Changed to theme color
              backgroundColor: (theme) => `${theme.palette.tints.tint1}`, // Changed to theme color
            },
          },
        }}
      >
        <Tab
          label={
            <Badge color="primary" showZero>
              <Box sx={{ mr: 1 }}>All Orders</Box>
            </Badge>
          }
          sx={{ borderRadius: 1, mx: 0.5 }}
        />
        <Tab
          label={
            <Badge color="secondary" showZero>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShoppingBagIcon fontSize="small" sx={{ mr: 0.5 }} />
                Processing
              </Box>
            </Badge>
          }
          sx={{ borderRadius: 1, mx: 0.5 }}
        />
        <Tab
          label={
            <Badge color="info" showZero>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShippingIcon fontSize="small" sx={{ mr: 0.5 }} />
                Shipped
              </Box>
            </Badge>
          }
          sx={{ borderRadius: 1, mx: 0.5 }}
        />
        <Tab
          label={
            <Badge color="success" showZero>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DeliveredIcon fontSize="small" sx={{ mr: 0.5 }} />
                Delivered
              </Box>
            </Badge>
          }
          sx={{ borderRadius: 1, mx: 0.5 }}
        />
        <Tab
          label={
            <Badge color="warning" showZero>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PendingIcon fontSize="small" sx={{ mr: 0.5 }} />
                Pending
              </Box>
            </Badge>
          }
          sx={{ borderRadius: 1, mx: 0.5 }}
        />
        <Tab
          label={
            <Badge color="error" showZero>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CloseIcon fontSize="small" sx={{ mr: 0.5 }} />
                Cancelled
              </Box>
            </Badge>
          }
          sx={{ borderRadius: 1, mx: 0.5 }}
        />
      </Tabs>
    </Box>

    {/* No orders state */}
    {filteredOrders.length === 0 ? (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            display: "inline-flex", 
            p: 3, 
            borderRadius: "50%", 
            bgcolor: (theme) => `${theme.palette.tints.tint1}`, // Changed to theme color
            mb: 2 
          }}
        >
          <ReceiptIcon sx={{ fontSize: 60, color: (theme) => theme.palette.custom.highlight }} /> {/* Changed to theme color */}
        </Paper>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
          No orders found
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ maxWidth: 400, mx: "auto", mb: 3 }}
        >
          {searchTerm 
            ? `No results match "${searchTerm}". Try a different search term.`
            : currentTab !== 0
              ? `No orders with ${tabLabels[currentTab]} status found.`
              : "No orders available. New orders will appear here."}
        </Typography>
        {searchTerm && (
          <Button 
            variant="outlined" 
            onClick={() => setSearchTerm("")}
            sx={{ borderRadius: 2 }}
          >
            Clear Search
          </Button>
        )}
      </Box>
    ) : (
      <>
        {/* Orders Table */}
        <TableContainer 
          component={Paper} 
          elevation={0} 
          variant="outlined" 
          sx={{ borderRadius: "12px", overflow: "hidden", mb: 2 }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: (theme) => `${theme.palette.tints.tint2}` }}> {/* Changed to theme color */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}>Order ID</TableCell> {/* Changed to theme color */}
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}> {/* Changed to theme color */}
                  Customer / Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}>Date</TableCell> {/* Changed to theme color */}
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}>Items</TableCell> {/* Changed to theme color */}
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}>Total</TableCell> {/* Changed to theme color */}
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}>Status</TableCell> {/* Changed to theme color */}
                <TableCell sx={{ fontWeight: "bold", color: (theme) => theme.palette.custom.accent }}>Actions</TableCell> {/* Changed to theme color */}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => {
                // Handle different order structures (unify them)
                const orderId =
                  typeof order.id === "object" && order.id.date
                    ? order.id.date
                    : order.id || "N/A";

                const orderTitle =
                  order.title ||
                  (order.shippingAddress?.name
                    ? `Order for ${order.shippingAddress.name}`
                    : `Order #${orderId.substring(0, 8)}`);

                const orderItems = order.items || [];
                const orderDate = order?.createdAt || "N/A";
                const orderTotal = calculateTotal(orderItems);
                const orderStatus =
                  order.status || order.paymentStatus || "Processing";

                return (
                  <TableRow
                    key={orderId}
                    sx={{
                      "&:hover": { bgcolor: (theme) => `${theme.palette.tints.tint3}` }, // Changed to theme color
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenDetail(order)}
                  >
                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: "medium",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {typeof orderId === "string"
                        ? orderId.substring(0, 8)
                        : orderId}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {orderTitle}
                      </Typography>
                      {order.description && (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ display: "block" }}
                        >
                          {order.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{orderDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ maxWidth: 250 }}>
                        {orderItems.slice(0, 2).map((item, index) => (
                          <Typography
                            key={`${orderId}-item-${index}`}
                            variant="body2"
                            noWrap
                          >
                            {item.productName ||
                              item.name ||
                              `Item ${index + 1}`}
                            (Qty: {item.quantity})
                          </Typography>
                        ))}
                        {orderItems.length > 2 && (
                          <Typography
                            variant="body2"
                            sx={{ cursor: "pointer", color: (theme) => theme.palette.custom.highlight }}
                          >
                            +{orderItems.length - 2} more
                            items
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        ₹{orderTotal}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(orderStatus)}</TableCell>
                    <TableCell>
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                          minWidth: 140,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 1.5,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: (theme) => theme.palette.custom.main, // Changed to theme color
                            },
                          },
                        }}
                      >
                        <InputLabel id={`status-label-${orderId}`}>
                          Status
                        </InputLabel>
                        <Select
                          labelId={`status-label-${orderId}`}
                          id={`status-select-${orderId}`}
                          value={orderStatus}
                          onChange={(e) => {
                            e.stopPropagation(); // Prevent row click
                            handleStatusChange(orderId, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent row click
                          label="Status"
                          MenuProps={{
                            PaperProps: {
                              elevation: 2,
                              sx: {
                                maxHeight: 300,
                                mt: 0.5,
                                borderRadius: 1.5,
                              },
                            },
                          }}
                        >
                          {Object.values(ORDER_STATUS).map((option) => (
                            <MenuItem
                              key={`status-${option.value}-${orderId}`}
                              value={option.value}
                              sx={{
                                py: 1.2,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                                "&:last-child": {
                                  borderBottom: "none",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      mr: 1,
                                      color: `${option.color}.main`,
                                    }}
                                  >
                                    {option.icon}
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {option.value}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ ml: 1 }}
                                >
                                  {option.description}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            ".MuiTablePagination-selectIcon": {
              color: (theme) => theme.palette.custom.highlight, // Changed to theme color
            },
          }}
        />
      </>
    )}

    {/* Order Detail Dialog */}
    <Dialog
      open={detailOpen}
      onClose={handleCloseDetail}
      maxWidth="md"
      fullWidth
      PaperProps={{
        elevation: 2,
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid",
          borderColor: (theme) => `${theme.palette.shades.light}`, // Changed to theme color
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Order Details</Typography>
          <IconButton
            onClick={handleCloseDetail}
            size="small"
            sx={{
              color: "#FF6B35", // Kept original accent color
              "&:hover": { backgroundColor: "rgba(255, 107, 53, 0.08)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <OrderDetails
          order={selectedOrder}
          onClose={handleCloseDetail}
          onStatusChange={handleStatusChange}
        />
      </DialogContent>
    </Dialog>
  </Paper>
  );
};

export default OrderManagement;
