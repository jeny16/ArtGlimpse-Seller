import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Stack,
  Divider
} from '@mui/material';
import { 
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const SellerAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState('monthly');

  const revenueData = [
    { name: 'Jan', Revenue: 4000, Orders: 2400 },
    { name: 'Feb', Revenue: 3000, Orders: 1398 },
    { name: 'Mar', Revenue: 5000, Orders: 3800 },
    { name: 'Apr', Revenue: 4780, Orders: 3908 },
    { name: 'May', Revenue: 3890, Orders: 2800 },
    { name: 'Jun', Revenue: 4390, Orders: 4200 },
  ];

  const productPerformance = [
    { name: 'Earrings', Sales: 400, Revenue: 2400 },
    { name: 'Necklace', Sales: 300, Revenue: 1398 },
    { name: 'Bracelet', Sales: 200, Revenue: 9800 },
    { name: 'Ring', Sales: 278, Revenue: 3908 },
  ];

  const salesTimeline = [
    { 
      date: 'June 15', 
      event: 'Highest Daily Sales', 
      amount: '₹5,400',
      icon: <TrendingUpIcon color="success" />
    },
    { 
      date: 'June 10', 
      event: 'New Product Launch', 
      amount: '26 Units Sold',
      icon: <StoreIcon color="primary" />
    },
    { 
      date: 'June 5', 
      event: 'Inventory Restock', 
      amount: '50 New Items',
      icon: <InventoryIcon color="secondary" />
    },
  ];

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3, 
      backgroundColor: 'background.default',
      mt: 16
    }}>
      <Grid container spacing={3}>
        {/* Header and Time Period Selector */}
        <Grid item xs={12}>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={2}
          >
            <Typography variant="h4" gutterBottom>
              Sales Analytics
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={timePeriod}
                label="Time Period"
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Sales Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Revenue
              </Typography>
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2}
              >
                <AttachMoneyIcon color="primary" />
                <Typography variant="h4">₹12,546</Typography>
                <Typography color="success.main">(+15.5%)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Orders
              </Typography>
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2}
              >
                <StoreIcon color="primary" />
                <Typography variant="h4">248</Typography>
                <Typography color="success.main">(+22.3%)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Conversion Rate
              </Typography>
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2}
              >
                <TrendingUpIcon color="primary" />
                <Typography variant="h4">3.6%</Typography>
                <Typography color="success.main">(+5.2%)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue and Orders Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Revenue" fill="#8884d8" />
                  <Bar dataKey="Orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Timeline */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Sales Events
              </Typography>
              <Timeline>
                {salesTimeline.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                      {item.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot>{item.icon}</TimelineDot>
                      {index < salesTimeline.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2">{item.event}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.amount}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>

        {/* Product Performance */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Sales" fill="#8884d8" />
                  <Bar dataKey="Revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerAnalytics;