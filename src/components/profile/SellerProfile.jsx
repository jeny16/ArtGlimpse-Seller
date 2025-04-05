import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Typography, Avatar,
  Button, Grid, TextField
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProfile, updateSellerProfile } from '../../store/SellerProfileSlice';

// --- Seller Profile Header ---
const SellerProfileHeader = ({ name }) => (
  <Box sx={{ p: 4, textAlign: 'center', backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)' }}>
    <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'custom.highlight' }}>
      {name?.charAt(0).toUpperCase() || 'S'}
    </Avatar>
    <Typography variant="h5" fontWeight="bold" color="custom.highlight">Seller Profile</Typography>
    <Typography variant="body2" color="text.secondary">Manage your seller account information</Typography>
  </Box>
);

// --- Reusable View Field Component ---
const SellerProfileField = ({ label, value, icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #f0f0f0' }}>
    <Box sx={{
      width: 40, height: 40, borderRadius: '50%',
      backgroundColor: 'rgba(193, 121, 18, 0.1)', color: 'custom.highlight',
      display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body1">{value?.trim() || 'Not Provided'}</Typography>
    </Box>
  </Box>
);

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.sellerProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    name: '', email: '', contactNumber: '', address: ''
  });
  
  // ✅ Extract userId safely from localStorage or persisted Redux state
  const getUserId = () => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userObj = JSON.parse(userString);
        return userObj?.userId;
      }
  
      const persistRoot = JSON.parse(localStorage.getItem('persist:root'));
      if (persistRoot?.auth) {
        const authData = JSON.parse(persistRoot.auth);
        return authData?.userId;
      }
    } catch (err) {
      console.error("Error extracting userId from localStorage:", err);
    }
    return null;
  };
  
  const userId = getUserId();
  
  useEffect(() => {
    if (userId) dispatch(fetchSellerProfile(userId));
  }, [userId, dispatch]);
  
  useEffect(() => {
    if (profile) {
      setLocalProfile({
        name: profile.name || '',
        email: profile.email || '',
        contactNumber: profile.contactNumber || '',
        address: profile.address || ''
      });
    }
  }, [profile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSellerProfile({ userId, profileData: localProfile }));
    setIsEditing(false);
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  const viewFields = [
    { label: 'Name', value: localProfile.name, icon: <PersonIcon /> },
    { label: 'Email', value: localProfile.email, icon: <EmailIcon /> },
    { label: 'Contact Number', value: localProfile.contactNumber, icon: <PhoneIcon /> },
    { label: 'Address', value: localProfile.address, icon: <LocationOnIcon /> }
  ];

  return (
    <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <SellerProfileHeader name={localProfile.name} />
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Name" name="name" value={localProfile.name}
                  onChange={handleChange} required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Email" name="email" value={localProfile.email}
                  onChange={handleChange} required type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Contact Number" name="contactNumber"
                  value={localProfile.contactNumber}
                  onChange={handleChange} required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Address" name="address" value={localProfile.address}
                  onChange={handleChange} multiline rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined" color="secondary" startIcon={<Cancel />}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit" variant="contained" color="secondary" startIcon={<Save />}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        ) : (
          <>
            <Grid container spacing={3}>
              {viewFields.map((field, index) => (
                <Grid item xs={12} key={index}>
                  <SellerProfileField {...field} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained" startIcon={<Edit />}
                sx={{ backgroundColor: 'custom.highlight', color: 'white' }}
                onClick={() => setIsEditing(true)}
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
