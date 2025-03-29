import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Paper 
} from '@mui/material';

// Imported Components
import Sidebar from '../components/profile/ProfileSideBar';
import SellerProfile from '../components/profile/SellerProfile';
import StoreDetails from '../components/profile/StoreDetails';
import PaymentDetails from '../components/profile/PaymentDetails';
import TermsAndConditions from '../components/profile/Terms';
import PrivacyPolicy from '../components/profile/Privacy';
import DeleteAccount from '../components/profile/DeleteAccount';

const SellerProfileManagement = () => {
  const [activeSection, setActiveSection] = useState('sellerProfile');

  const sectionComponents = {
    sellerProfile: <SellerProfile />, 
    storeDetails: <StoreDetails storeData={null} />,
    paymentDetails: <PaymentDetails />,
    terms: <TermsAndConditions />,
    privacy: <PrivacyPolicy />,
    deleteAccount: <DeleteAccount />
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderLeft: "4px solid #c27c0e",
          bgcolor: "rgba(194, 124, 14, 0.05)"
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          My Account
        </Typography>
        <Typography variant="body1">
          Manage your seller profile and account settings
        </Typography>
      </Box>
      
      {/* Main content grid */}
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ height: "100%" }}>
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </Paper>
        </Grid>
        
        {/* Content Area */}
        <Grid item xs={12} md={9}>
          {sectionComponents[activeSection]}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SellerProfileManagement;