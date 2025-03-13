import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../store/StatSlice';
import { 
  Typography, 
  Grid, 
  Container
} from '@mui/material';
import { 
  PlusCircle, 
  ShoppingBag, 
  BarChart2, 
  Package, 
  TrendingUp, 
  DollarSign,
  Clipboard,
  Settings
} from 'lucide-react';
import StatCard from '../components/StatCard';
import QuickActionCard from '../components/QuickActionCard';
import RecentOrders from '../components/RecentOrders';
import ProductPerformance from '../components/ProductPerformance';
import NotificationsWidget from '../components/NotificationWidget';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 15, backgroundColor: 'background.default' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center', color: 'text.primary' }}>
        Seller Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <StatCard icon={DollarSign} title="Total Revenue" value={`₹${stats.totalRevenue || 0}`} change={15.5} color="primary.main" subtext="Net Sales" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatCard icon={ShoppingBag} title="Total Orders" value={stats.totalOrders || 0} change={22.3} color="success.main" subtext="Completed" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatCard icon={Package} title="Products Sold" value={stats.productsSold || 0} change={10.7} color="warning.main" subtext="Unique Items" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatCard icon={TrendingUp} title="Conversion Rate" value={`${stats.conversionRate || 0}%`} change={5.2} color="secondary.main" subtext="Visitor to Order" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <QuickActionCard icon={PlusCircle} title="Add Product" description="Expand your product catalog and reach more customers" onClick={() => navigate("/add-product")} />
            </Grid>
            <Grid item xs={12}>
              <QuickActionCard icon={BarChart2} title="Analytics" description="Deep dive into your sales performance and trends" onClick={() => navigate("/analytics")} />
            </Grid>
            <Grid item xs={12}>
              <QuickActionCard icon={Package} title="Inventory" description="Manage and track your product stock levels" onClick={() => navigate("/inventory")} />
            </Grid>
            <Grid item xs={12}>
              <QuickActionCard icon={Clipboard} title="Orders" description="View and manage all your customer orders" onClick={() => navigate("/orders")} />
            </Grid>
            <Grid item xs={12}>
              <QuickActionCard icon={Settings} title="Settings" description="Configure your store preferences and profile" onClick={() => navigate("/settings")} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}><RecentOrders /></Grid>
            <Grid item xs={12}><ProductPerformance /></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}><NotificationsWidget /></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
