import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton
} from '@mui/material';
import { 
  Bell, 
  Package, 
  MessageCircle, 
  AlertCircle, 
  Award,
  X,
  MoreHorizontal
} from 'lucide-react';

const NotificationsWidget = () => {
  // Sample data - in a real application this would come from props or an API
  const notifications = [
    { 
      id: 1, 
      type: 'order', 
      message: 'New order #ORD-7829 received from Rahul Sharma - 3 items for ₹1,450', 
      time: '10 minutes ago',
      read: false
    },
    { 
      id: 2, 
      type: 'message', 
      message: 'Customer Priya Patel has inquired about the shipping time for order #ORD-7825', 
      time: '1 hour ago',
      read: false
    },
    { 
      id: 3, 
      type: 'alert', 
      message: 'Low stock alert for "Eco-Friendly Water Bottle" - Only 5 units remaining', 
      time: '3 hours ago',
      read: true
    },
    { 
      id: 4, 
      type: 'achievement', 
      message: 'Congratulations! You reached 200 orders this month - a new record for your store', 
      time: '1 day ago',
      read: true
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'order':
        return <Package size={20} />;
      case 'message':
        return <MessageCircle size={20} />;
      case 'alert':
        return <AlertCircle size={20} color="#f44336" />;
      case 'achievement':
        return <Award size={20} color="#ffc107" />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <Card sx={{ boxShadow: 2, mb: 2 }}>
      <CardHeader 
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bell size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6">Recent Notifications</Typography>
          </Box>
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              label={`${notifications.filter(n => !n.read).length} New`} 
              color="primary" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <IconButton size="small">
              <MoreHorizontal size={20} />
            </IconButton>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <Grid container>
          {notifications.map((notification) => (
            <Grid item xs={12} md={6} lg={3} key={notification.id}>
              <Box 
                sx={{ 
                  p: 2, 
                  borderRight: { xs: 'none', md: '1px solid' }, 
                  borderBottom: { xs: '1px solid', md: 'none' },
                  borderColor: 'divider',
                  height: '100%',
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  position: 'relative'
                }}
              >
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box 
                    sx={{ 
                      mr: 1.5, 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'action.selected'
                    }}
                  >
                    {getIcon(notification.type)}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="body2" 
                      fontWeight={notification.read ? 400 : 600}
                      color="text.primary"
                      sx={{ mb: 0.5 }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                  {!notification.read && (
                    <IconButton 
                      size="small" 
                      sx={{ 
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 20,
                        height: 20
                      }}
                    >
                      <X size={14} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1.5 }}>
          <Button variant="text" size="small">
            View All Notifications
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationsWidget;