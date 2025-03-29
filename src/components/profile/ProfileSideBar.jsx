import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Divider
} from '@mui/material';

// Icons (keeping the original seller portal icons)
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Storefront';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  // Sidebar configuration divided into sections
  const sidebarSections = [
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Profile', id: 'sellerProfile', icon: <PersonIcon /> },
        { label: 'Store Details', id: 'storeDetails', icon: <StoreIcon /> },
        { label: 'Payment Details', id: 'paymentDetails', icon: <PaymentIcon /> },
        { label: 'Delete Account', id: 'deleteAccount', icon: <DeleteIcon /> },
      ]
    },
    {
      title: 'LEGAL',
      items: [
        { label: 'Terms & Conditions', id: 'terms', icon: <DescriptionIcon /> },
        { label: 'Privacy Policy', id: 'privacy', icon: <SecurityIcon /> },
      ]
    }
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        overflow: 'hidden',
        borderRadius: 2,
        transition: 'box-shadow 0.3s ease',
        width: 280,
      }}
    >
      {sidebarSections.map((section, sIndex) => (
        <Box key={`section-${sIndex}`}>
          {/* Section title */}
          {section.title && (
            <Box
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: 'rgba(193, 121, 18, 0.04)',
                borderTop: sIndex > 0 ? '1px solid' : 'none',
                borderBottom: '1px solid',
                borderColor: 'rgba(193, 121, 18, 0.1)'
              }}
            >
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  color: 'text.secondary',
                  letterSpacing: '1px',
                  fontSize: '0.7rem'
                }}
              >
                {section.title}
              </Typography>
            </Box>
          )}

          {/* Section items */}
          <List disablePadding>
            {section.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    sx={{
                      px: 3,
                      py: 1.8,
                      color: isActive ? 'custom.highlight' : 'text.primary',
                      backgroundColor: isActive
                        ? 'rgba(193, 121, 18, 0.08)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: isActive
                          ? 'rgba(193, 121, 18, 0.12)'
                          : 'rgba(193, 121, 18, 0.04)'
                      },
                      borderLeft: '4px solid',
                      borderColor: isActive ? 'custom.highlight' : 'transparent',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        color: isActive ? 'custom.highlight' : 'text.secondary',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {item.icon}
                    </Box>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 'bold' : 'medium',
                        color: isActive ? 'custom.highlight' : 'inherit',
                        fontSize: '0.95rem'
                      }}
                    />
                    {isActive && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: 'custom.highlight',
                          ml: 1
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          {sIndex < sidebarSections.length - 1 && (
            <Divider sx={{ borderColor: 'rgba(193, 121, 18, 0.08)' }} />
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default ProfileSidebar;
