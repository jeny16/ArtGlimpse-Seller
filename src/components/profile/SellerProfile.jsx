import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Jeny Pansuriya',
    email: 'workjeny16@gmail.com',
    phone: '+91 9876543210',
    gender: 'Female',
    dateOfBirth: '1990-01-15'
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Typically, you'd dispatch an action or make an API call here.
    setIsEditing(false);
  };

  // Component for displaying individual profile fields (view mode)
  const DisplayField = ({ label, value, icon }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'rgba(193, 121, 18, 0.1)',
          color: 'custom.highlight',
          mr: 2
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="medium" color="text.primary">
          {value || 'Not provided'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      {/* Header Section */}
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
          borderBottom: '1px solid',
          borderColor: 'shades.light'
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            bgcolor: 'custom.highlight',
            boxShadow: '0 4px 12px rgba(193, 121, 18, 0.3)'
          }}
        >
          {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'S'}
        </Avatar>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'custom.highlight', mb: 1 }}>
          Profile Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your seller profile details
        </Typography>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        {isEditing ? (
          <Box component="form" onSubmit={handleSave} sx={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  variant="outlined"
                  value={profileData.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="phone"
                  variant="outlined"
                  value={profileData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="email"
                  variant="outlined"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  variant="outlined"
                  value={profileData.gender}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={profileData.dateOfBirth}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'custom.highlight',
                  color: 'white',
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                  borderRadius: 1
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'custom.highlight',
                  color: 'custom.highlight',
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                  borderRadius: 1
                }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DisplayField label="Full Name" value={profileData.fullName} icon={<PersonIcon />} />
              </Grid>
              <Grid item xs={12}>
                <DisplayField label="Mobile Number" value={profileData.phone} icon={<PhoneIcon />} />
              </Grid>
              <Grid item xs={12}>
                <DisplayField label="Email ID" value={profileData.email} icon={<EmailIcon />} />
              </Grid>
              <Grid item xs={12}>
                <DisplayField label="Gender" value={profileData.gender} icon={<WcIcon />} />
              </Grid>
              <Grid item xs={12}>
                <DisplayField label="Date of Birth" value={profileData.dateOfBirth} icon={<CakeIcon />} />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={<PersonIcon />}
                sx={{
                  backgroundColor: 'custom.highlight',
                  color: 'white',
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                  borderRadius: 1
                }}
                onClick={handleEditToggle}
              >
                Edit Profile
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default SellerProfile;
