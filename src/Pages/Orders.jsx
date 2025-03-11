import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  ShoppingCart 
} from 'lucide-react';

// Mock data - in a real application, this would come from an API
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'Rajesh Kumar',
    date: '2024-03-05',
    total: '₹4,500',
    status: 'New',
    items: 3
  },
  {
    id: 'ORD-002',
    customerName: 'Priya Sharma',
    date: '2024-03-04',
    total: '₹7,200',
    status: 'Shipped',
    items: 2
  },
  {
    id: 'ORD-003',
    customerName: 'Amit Patel',
    date: '2024-03-03',
    total: '₹2,800',
    status: 'Completed',
    items: 1
  },
  {
    id: 'ORD-004',
    customerName: 'Neha Gupta',
    date: '2024-03-02',
    total: '₹5,600',
    status: 'Canceled',
    items: 2
  }
];

// Status color mapping
const getStatusColor = (status) => {
  switch(status) {
    case 'New': return 'info';
    case 'Shipped': return 'primary';
    case 'Completed': return 'success';
    case 'Canceled': return 'error';
    default: return 'default';
  }
};

// Status icon mapping
const getStatusIcon = (status) => {
  switch(status) {
    case 'New': return <ShoppingCart />;
    case 'Shipped': return <Truck />;
    case 'Completed': return <CheckCircle />;
    case 'Canceled': return <XCircle />;
    default: return <Package />;
  }
};

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter orders based on status
  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const orderStatusSummary = {
    New: orders.filter(o => o.status === 'New').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Completed: orders.filter(o => o.status === 'Completed').length,
    Canceled: orders.filter(o => o.status === 'Canceled').length
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // Simulate order status update
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Container 
      maxWidth="lg"
      sx={{ 
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 3 },
        mt: "33px",
        backgroundColor: '#FDF6E9'
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: '#FFFFFF', 
          width: '100%',
          borderRadius: 2,
          p: { xs: 2, sm: 4 },
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center',
            fontWeight: 600,
            color: '#332f25', 
            mb: 4,
            fontFamily: "'Raleway', sans-serif"
          }}
        >
          Order Management
        </Typography>

        {/* Order Status Summary */}
        <Grid container spacing={3} mb={4}>
          {Object.entries(orderStatusSummary).map(([status, count]) => (
            <Grid item xs={6} sm={3} key={status}>
              <Card 
                sx={{ 
                  width: '100%',
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  backgroundColor: '#FDF7ED',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    {getStatusIcon(status)}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#332f25', 
                        fontFamily: "'Raleway', sans-serif"
                      }}
                    >
                      {status}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#605b50', 
                      fontWeight: 600
                    }}
                  >
                    {count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Order Filtering and Table */}
        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#332f25',
              fontFamily: "'Raleway', sans-serif"
            }}
          >
            Recent Orders
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Filter Status"
            >
              <MenuItem value="All">All Orders</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: '#FDF9F1' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Canceled">Canceled</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default OrderManagement;