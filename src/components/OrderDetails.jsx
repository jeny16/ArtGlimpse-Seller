//  .jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from "@mui/material";

// Import icons from Material-UI
import InfoIcon from "@mui/icons-material/Info";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";

// Import or define your helper functions/constants as needed
// For example:
// import { getStatusChip, calculateTotal } from "../utils/orderUtils";
// import { formatDate } from "../utils/dateUtils"; // If needed
// import { ORDER_STATUS } from "../constants";

// If the date is already formatted in the slice, simply use order.createdAt
const OrderDetails = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={3}>
        {/* Order Header */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {order.title || `Order #${order.id?.substring(0, 8) || "Unknown"}`}
            </Typography>
            {getStatusChip(order.status || "Unknown")}
          </Box>
          <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <InfoIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
              Order Date: {order.createdAt || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ReceiptIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
              Order ID:{" "}
              <Box component="span" sx={{ fontFamily: "monospace", ml: 0.5 }}>
                {order.id || "Unknown"}
              </Box>
            </Typography>
          </Box>
        </Grid>

        {/* Order Items */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Order Items
            </Typography>
            <Tooltip title="Print Order Details">
              <IconButton size="small" sx={{ color: "primary.main" }}>
                <PrintIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ mb: 3, borderRadius: "12px", overflow: "hidden" }}
          >
            <Table size="small">
              <TableHead
                sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
              >
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                    Item
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                    Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(order.items || []).map((item, index) => (
                  <TableRow
                    key={`item-${index}`}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 36,
                            height: 36,
                            mr: 1.5,
                            bgcolor: "primary.light",
                          }}
                        >
                          {item.productName
                            ? item.productName.charAt(0)
                            : "P"}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.productName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      ₹{item.price?.toFixed(2) || "0.00"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.quantity}
                        size="small"
                        sx={{ bgcolor: "action.hover", fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: "primary.light" }}>
                  <TableCell
                    colSpan={3}
                    sx={{
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "primary.dark",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                    ₹{calculateTotal(order.items)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Customer Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Customer Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Card
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    fontSize: "0.875rem",
                    mr: 1.5,
                  }}
                >
                  {order.shippingAddress?.name?.charAt(0) || "U"}
                </Avatar>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {order.shippingAddress?.name || "N/A"}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", my: 0.5 }}
              >
                <Box component="span" sx={{ width: 80, color: "text.secondary" }}>
                  Email:
                </Box>
                {order.customer?.email || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", my: 0.5 }}
              >
                <Box component="span" sx={{ width: 80, color: "text.secondary" }}>
                  Phone:
                </Box>
                {order.customer?.phone || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Shipping Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Card
            variant="outlined"
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
              {order.shippingAddress ? (
                <>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <ShippingIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Delivery Address
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {order.shippingAddress.street}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} {order.shippingAddress.zip}
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.country}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">
                  No shipping information available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Status Update */}
        <Grid item xs={12}>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 240,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            >
              <InputLabel id="detail-status-label">Update Status</InputLabel>
              <Select
                labelId="detail-status-label"
                value={order.status || ""}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
                label="Update Status"
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
                {Object.values(ORDER_STATUS).map((status) => (
                  <MenuItem
                    key={`detail-status-${status.value}`}
                    value={status.value}
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
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 1, color: `${status.color}.main` }}>
                          {status.icon}
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {status.value}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {status.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  bgcolor: "#00A5AF",
                  "&:hover": { bgcolor: "#00798C" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
