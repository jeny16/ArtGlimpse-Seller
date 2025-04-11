import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../store/StatSlice';
import {
  Typography,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Fab,
  Badge,
  Popover,
  Paper,
  Grow,
  ClickAwayListener,
  Card,
  CardContent
} from '@mui/material';
import {
  PlusCircle,
  ShoppingBag,
  BarChart2,
  Package,
  TrendingUp,
  DollarSign,
  Bell,
  ShoppingBagIcon
} from 'lucide-react';
import {
  StatCard,
  QuickActionCard,
  RecentOrders,
  ProductPerformance,
  NotificationWidget
} from '../components/index';
import { useNavigate } from 'react-router-dom';

const HomeDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.stats);
  const userdata = JSON.parse(localStorage.getItem('user'));
  const token = userdata?.token;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationAnchorRef = useRef(null);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchStats());
    }
  }, [dispatch, token]);
  
  console.log("Current stats state:", stats);
  
  
  const toggleNotifications = () => {
    setNotificationsOpen((prevOpen) => !prevOpen);
  };

  const handleCloseNotifications = (event) => {
    if (notificationAnchorRef.current && notificationAnchorRef.current.contains(event.target)) {
      return;
    }
    setNotificationsOpen(false);
  };

  const unreadNotifications = 3;

  return (
    <Box sx={{ display: "flex", my: 16, minHeight: "100vh", px: 2, py: 4, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box component="main" sx={{ flexGrow: 1, width: "100%", maxWidth: "lg" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
            {/* SELLER-PORTAL */}
          </Typography>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={`₹${stats.totalRevenue || 0}`}
              change={15.5}
              color="primary.highlight"
              subtext="Net Sales"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={ShoppingBag}
              title="Total Orders"
              value={stats.totalOrders || 0}
              change={22.3}
              color="success.main"
              subtext="Completed"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={Package}
              title="Products Sold"
              value={stats.productsSold || 0}
              change={10.7}
              color="warning.main"
              subtext="Unique Items"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={TrendingUp}
              title="Conversion Rate"
              value={`${stats.conversionRate || 0}%`}
              change={5.2}
              color="secondary.main"
              subtext="Visitor to Order"
            />
          </Grid>
        </Grid>

        {/* Main Dashboard Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: "0 0 10px rgba(0,0,0,0.05)", overflow: "visible" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <QuickActionCard icon={Package} title="Inventory" description="Manage stock" onClick={() => navigate("/inventory")} />
                  </Grid>
                  <Grid item xs={12}>
                    <QuickActionCard icon={ShoppingBagIcon} title="Orders" description="See all Orders" onClick={() => navigate("/orders")} />
                  </Grid>
                  <Grid item xs={12}>
                    <QuickActionCard icon={PlusCircle} title="Add Product" description="Add new items" onClick={() => navigate("/add-product")} />
                  </Grid>
                  <Grid item xs={12}>
                    <QuickActionCard icon={BarChart2} title="Analytics" description="Check performance" onClick={() => navigate("/analytics")} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}><RecentOrders /></Grid>
              <Grid item xs={12}><ProductPerformance /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* <Fab
        color="primary"
        aria-label="notifications"
        sx={{ position: "fixed", bottom: 16, right: 16, display: { xs: "flex", md: "flex" } }}
        onClick={toggleNotifications}
        ref={notificationAnchorRef}
      >
        <Badge badgeContent={unreadNotifications} color="error"><Bell /></Badge>
      </Fab>

      <Popover
        open={notificationsOpen}
        anchorEl={notificationAnchorRef.current}
        onClose={handleCloseNotifications}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPopover-paper": {
            width: { xs: "90%", sm: 350 },
            maxHeight: 500,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            mb: 1,
          },
        }}
      >
        <ClickAwayListener onClickAway={handleCloseNotifications}>
          <Grow in={notificationsOpen}>
            <Paper sx={{ overflow: "hidden", height: "100%" }}>
              <Box sx={{ height: "calc(100% - 56px)", overflowY: "auto" }}>
                <NotificationWidget popup />
              </Box>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popover> */}
    </Box>
  );
};

export default HomeDashBoard;
