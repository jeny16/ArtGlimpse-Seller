import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  TextField,
  Avatar,
  IconButton,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit, Save, Camera } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { logout } from "../store/authSlice";
import authService from '../action/authService';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: '100px', // Space for fixed header
  paddingBottom: '40px'
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  border: '1px solid #dbd4c7',
  backgroundColor: theme.palette.primary.main,
}));

const ProfileField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ProfileLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}));

const ProfileValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral.main,
}));

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // In a real application, you would get this from your Redux store
  const [profileData, setProfileData] = useState({
    name: 'Sophie Anderson',
    email: 'sophie@artglimpse.com',
    phone: '+1 (555) 123-4567',
    storeTitle: 'Sophie\'s Art Studio',
    bio: 'Contemporary artist specializing in abstract paintings and mixed media.',
    address: '123 Creative Lane, Portland, OR 97205',
    website: 'www.sophieandersonart.com',
    joinDate: 'March 15, 2022',
    accountStatus: 'Verified',
    taxId: 'ART-123456789',
    bankName: 'CreativeBank',
    accountNumber: '******4321'
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Simulate saving profile
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 1000);
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ProfileContainer>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, color: theme.palette.custom.highlight }}
      >
        Seller Profile
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <ProfilePaper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* <Avatar
              src="https://via.placeholder.com/100"
              alt={profileData.name}
              sx={{
                width: 80,
                height: 80,
                border: "2px solid",
                borderColor: theme.palette.custom.highlight,
              }}
            /> */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {profileData.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.main }}
              >
                Member since {profileData.joinDate}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button 
            variant="contained" 
            onClick={handleLogout}
            sx={{
                backgroundColor: theme.palette.custom.highlight,
                textTransform: 'none',
                fontWeight: 500,
                color: '#fff',
                '&:hover': { backgroundColor: theme.palette.custom.accent },
              }}
            >
              Log Out
            </Button>{"       "}
            <Button
              variant={isEditing ? "contained" : "outlined"}
              startIcon={isEditing ? <Save /> : <Edit />}
              onClick={handleEditToggle}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                backgroundColor: isEditing
                  ? theme.palette.custom.highlight
                  : "transparent",
                borderColor: theme.palette.custom.highlight,
                color: isEditing ? "white" : theme.palette.custom.highlight,
                "&:hover": {
                  backgroundColor: isEditing
                    ? theme.palette.custom.accent
                    : "transparent",
                  borderColor: theme.palette.custom.accent,
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : isEditing ? (
                "Save Profile"
              ) : (
                "Edit Profile"
              )}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Personal Information
            </Typography>

            <ProfileField>
              <ProfileLabel>Full Name</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ProfileValue variant="body1">{profileData.name}</ProfileValue>
              )}
            </ProfileField>

            <ProfileField>
              <ProfileLabel>Email Address</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ProfileValue variant="body1">{profileData.email}</ProfileValue>
              )}
            </ProfileField>

            <ProfileField>
              <ProfileLabel>Phone Number</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ProfileValue variant="body1">{profileData.phone}</ProfileValue>
              )}
            </ProfileField>

            <ProfileField>
              <ProfileLabel>Address</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ProfileValue variant="body1">
                  {profileData.address}
                </ProfileValue>
              )}
            </ProfileField>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Store Information
            </Typography>

            <ProfileField>
              <ProfileLabel>Store Title</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="storeTitle"
                  value={profileData.storeTitle}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ProfileValue variant="body1">
                  {profileData.storeTitle}
                </ProfileValue>
              )}
            </ProfileField>

            <ProfileField>
              <ProfileLabel>Website</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ProfileValue variant="body1">
                  {profileData.website}
                </ProfileValue>
              )}
            </ProfileField>

            <ProfileField>
              <ProfileLabel>Bio</ProfileLabel>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                  multiline
                  rows={3}
                />
              ) : (
                <ProfileValue variant="body1">{profileData.bio}</ProfileValue>
              )}
            </ProfileField>

            <ProfileField>
              <ProfileLabel>Tax ID</ProfileLabel>
              <ProfileValue variant="body1">{profileData.taxId}</ProfileValue>
            </ProfileField>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Payment Information
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProfileField>
              <ProfileLabel>Bank Name</ProfileLabel>
              <ProfileValue variant="body1">
                {profileData.bankName}
              </ProfileValue>
            </ProfileField>
          </Grid>

          <Grid item xs={12} md={6}>
            <ProfileField>
              <ProfileLabel>Account Number</ProfileLabel>
              <ProfileValue variant="body1">
                {profileData.accountNumber}
              </ProfileValue>
            </ProfileField>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.custom.highlight,
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: theme.palette.custom.accent,
              },
            }}
          >
            Update Payment Information
          </Button>
        </Box>
      </ProfilePaper>
    </ProfileContainer>
  );
};

export default Profile;


