import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Divider 
} from '@mui/material';
import { 
  PersonOutlined, 
  LocationOnOutlined, 
  ShoppingBagOutlined, 
  LocalOfferOutlined, 
  CreditCardOutlined, 
  AccountBalanceWalletOutlined, 
  DeleteOutlined,
  DescriptionOutlined,
  PrivacyTipOutlined,
  StorefrontOutlined
} from '@mui/icons-material';

const ProfileSidebar = ({ activeSection, setActiveSection, isSeller }) => {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <PersonOutlined /> },
    { id: 'addresses', label: 'Addresses', icon: <LocationOnOutlined /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBagOutlined /> },
    { id: 'coupons', label: 'Coupons', icon: <LocalOfferOutlined /> },
    { id: 'cards', label: 'Saved Cards', icon: <CreditCardOutlined /> },
    { id: 'upi', label: 'Saved UPI', icon: <AccountBalanceWalletOutlined /> },
  ];

  // Add seller menu item if user is a seller
  if (isSeller) {
    menuItems.push({ id: 'seller', label: 'Seller Dashboard', icon: <StorefrontOutlined /> });
  }

  const bottomMenuItems = [
    { id: 'terms', label: 'Terms of Service', icon: <DescriptionOutlined /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <PrivacyTipOutlined /> },
    { id: 'delete', label: 'Delete Account', icon: <DeleteOutlined /> }
  ];

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <List component="nav" disablePadding>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            selected={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
            sx={{
              py: 1.5,
              pl: 3,
              borderLeft: '3px solid',
              borderColor: activeSection === item.id ? 'primary.main' : 'transparent',
              bgcolor: activeSection === item.id ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.04)',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: activeSection === item.id ? 'primary.main' : 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ 
                fontWeight: activeSection === item.id ? 600 : 400,
                color: activeSection === item.id ? 'primary.main' : 'text.primary',
              }} 
            />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List component="nav" disablePadding>
        {bottomMenuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            selected={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
            sx={{
              py: 1.5,
              pl: 3,
              borderLeft: '3px solid',
              borderColor: activeSection === item.id ? 'primary.main' : 'transparent',
              bgcolor: activeSection === item.id ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.04)',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: activeSection === item.id ? 'primary.main' : 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ 
                fontWeight: activeSection === item.id ? 600 : 400,
                color: activeSection === item.id ? 'primary.main' : 'text.primary',
                fontSize: '0.875rem'
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ProfileSidebar;