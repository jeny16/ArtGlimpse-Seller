import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import UpdateIcon from '@mui/icons-material/Update';

const TermsAndConditions = () => {
  const [open, setOpen] = useState(false);

  const termsHighlights = [
    {
      icon: <SecurityIcon sx={{ color: 'custom.highlight' }} />,
      primary: "Account Security",
      secondary: "Protect your account and personal information"
    },
    {
      icon: <DescriptionIcon sx={{ color: 'custom.highlight' }} />,
      primary: "Clear Guidelines",
      secondary: "Understand platform usage rules"
    },
    {
      icon: <UpdateIcon sx={{ color: 'custom.highlight' }} />,
      primary: "Regular Updates",
      secondary: "Terms may be modified periodically"
    }
  ];

  const handleOpenTerms = () => {
    setOpen(true);
  };

  const handleCloseTerms = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'tints.tint3',
          backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)'
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            borderBottom: '1px solid',
            borderColor: 'shades.light'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
            <GavelIcon sx={{ color: 'custom.highlight', fontSize: 32, mr: 1 }} />
            <Typography variant="h5" component="h1" fontWeight="bold" sx={{ color: 'custom.highlight' }}>
              Terms & Conditions
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Review the legal terms governing your seller account
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <List>
            {termsHighlights.map((item, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.primary} 
                  secondary={item.secondary}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            ))}
          </List>

          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'rgba(193, 121, 18, 0.05)',
              borderRadius: 2,
              mt: 2
            }}
          >
            <UpdateIcon sx={{ color: 'custom.highlight', mr: 2 }} />
            <Typography variant="body2">
              Last Updated: March 1, 2025
            </Typography>
          </Box>

          <Box mt={2} textAlign="center">
            <Button 
              variant="contained"
              sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'bold', 
                borderRadius: 2, 
                color: 'white', 
                bgcolor: 'custom.highlight', 
                '&:hover': { bgcolor: 'custom.accent' },
                px: 3
              }}
              onClick={handleOpenTerms}
            >
              Read Full Terms
            </Button>
          </Box>
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={handleCloseTerms}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <GavelIcon sx={{ mr: 2, color: 'custom.highlight' }} />
            <Typography variant="h6" fontWeight="bold">
              Complete Terms of Use
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph>
            Welcome to ArtGlimpse. These Terms of Use govern your use of our platform.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1, color: 'custom.highlight' }}>
            Key Highlights:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Account Security" 
                secondary="You are responsible for maintaining the confidentiality of your account credentials."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Platform Usage" 
                secondary="Abide by all applicable laws and refrain from fraudulent or harmful activities."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Liability Limitation" 
                secondary="Our liability is limited to the amount paid for the product that gave rise to any claim."
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms} color="primary">
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={() => window.open('mailto:support@artglimpse.com', '_blank')}
            sx={{ 
              textTransform: 'uppercase', 
              fontWeight: 'bold', 
              color: 'white', 
              bgcolor: 'custom.highlight', 
              '&:hover': { bgcolor: 'custom.accent' }
            }}
          >
            Contact Support
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TermsAndConditions;