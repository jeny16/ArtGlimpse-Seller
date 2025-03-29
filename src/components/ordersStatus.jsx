import React from 'react';
import { Chip, Box, Typography } from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ORDER_STATUS = {
  PENDING: {
    value: "Pending",
    color: "warning",
    icon: <PendingIcon fontSize="small" />,
    // description: "Awaiting processing",
  },
  PROCESSING: {
    value: "Processing",
    color: "secondary",
    icon: <InventoryIcon fontSize="small" />,
    // description: "Order being prepared",
  },
  SHIPPED: {
    value: "Shipped",
    color: "info",
    icon: <LocalShippingIcon fontSize="small" />,
    // description: "In transit",
  },
  DELIVERED: {
    value: "Delivered",
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
    // description: "Successfully delivered",
  },
  CANCELLED: {
    value: "Cancelled",
    color: "error",
    icon: <CancelIcon fontSize="small" />,
    // description: "Order cancelled",
  },
  // ADD THIS
  PAID: {
    value: "PAID",
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
    // description: "Payment complete",
  },
};

// Fix the reference in .find()
const getStatusChip = (orderStatus) => {
  const statusConfig =
    Object.values(ORDER_STATUS).find(
      (config) => config.value === orderStatus
    ) || {
      value: orderStatus,
      color: "default",
      icon: <HelpOutlineIcon fontSize="small" />,
      description: "Unknown status",
    };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Chip
        icon={statusConfig.icon}
        label={statusConfig.value}
        color={statusConfig.color}
        size="small"
        sx={{
          "& .MuiChip-icon": {
            marginLeft: "5px",
          },
        }}
      />
    </Box>
  );
};

export { ORDER_STATUS, getStatusChip };
