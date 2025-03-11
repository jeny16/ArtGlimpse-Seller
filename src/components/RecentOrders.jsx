import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider
} from '@mui/material';

const RecentOrders = () => {
  // Sample order data
  const orders = [
    { id: 1, title: 'Order #12345', date: 'Jan 20, 2025', status: 'Delivered' },
    { id: 2, title: 'Order #12346', date: 'Jan 21, 2025', status: 'Processing' },
    { id: 3, title: 'Order #12347', date: 'Jan 22, 2025', status: 'Shipped' }
  ];

  return (
    <List sx={{ width: '100%' }}>
      {orders.map((order, index) => (
        <React.Fragment key={order.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{order.id}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={order.title}
              // Override the default Typography for secondary text so it renders as a <div>
              secondary={
                <Typography component="div" variant="body2" color="textSecondary">
                  {order.date} - {order.status}
                </Typography>
              }
              // Alternatively, you can simply use:
              // secondaryTypographyProps={{ component: 'div' }}
            />
          </ListItem>
          {index < orders.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecentOrders;
