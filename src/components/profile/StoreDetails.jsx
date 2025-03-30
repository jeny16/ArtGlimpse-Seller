import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Button, TextField, Divider,
  Grid, Box, Chip, Avatar, CircularProgress, Alert,
  Card, CardMedia, CardContent, Skeleton
} from '@mui/material';
import { Edit, Save, Cancel, Link, CalendarMonth, Policy, Category } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreDetails, updateStoreDetails } from '../../store/StoreDetailsSlice';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: theme.palette.secondary.main,
  }
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

// Helper function to extract userId
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

const StoreDetails = () => {
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.storeDetails);

  const userId = getUserId();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '', 
    description: '', 
    logo: '', 
    banner: '',
    categories: '', 
    website: '', 
    establishedDate: '', 
    returnPolicy: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(fetchStoreDetails(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (details) {
      setFormData({
        storeName: details.storeName || '',
        description: details.storeDescription || '',
        logo: details.storeLogoUrl || '',
        banner: details.storeBannerUrl || '',
        categories: details.categories?.join(', ') || '',
        website: details.website || '',
        establishedDate: details.establishedDate?.split('T')[0] || '',
        returnPolicy: details.returnPolicy || ''
      });
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if any
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.storeName.trim()) {
      errors.storeName = 'Store name is required';
    }
    
    if (formData.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      errors.website = 'Please enter a valid URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!userId) {
      console.error("No userId found!");
      return;
    }

    const processedData = {
      storeName: formData.storeName.trim(),
      storeDescription: formData.description.trim(),
      storeLogoUrl: formData.logo.trim(),
      storeBannerUrl: formData.banner.trim(),
      categories: formData.categories.split(',').map(cat => cat.trim()).filter(Boolean),
      website: formData.website.trim(),
      establishedDate: formData.establishedDate,
      returnPolicy: formData.returnPolicy.trim()
    };

    dispatch(updateStoreDetails({ sellerId: userId, storeDetails: processedData }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (details) {
      setFormData({
        storeName: details.storeName || '',
        description: details.storeDescription || '',
        logo: details.storeLogoUrl || '',
        banner: details.storeBannerUrl || '',
        categories: details.categories?.join(', ') || '',
        website: details.website || '',
        establishedDate: details.establishedDate?.split('T')[0] || '',
        returnPolicy: details.returnPolicy || ''
      });
    }
    setFormErrors({});
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <StyledPaper>
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <CircularProgress color="secondary" />
          <Typography variant="body1" mt={2}>Loading store details...</Typography>
        </Box>
      </StyledPaper>
    );
  }

  if (status === 'failed') {
    return (
      <StyledPaper>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load store details: {error}
        </Alert>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => dispatch(fetchStoreDetails(userId))}
        >
          Try Again
        </Button>
      </StyledPaper>
    );
  }

  const renderStoreView = () => (
    <Box>
      {/* {formData.banner && (
        <Card sx={{ mb: 4, boxShadow: 'none', bgcolor: 'transparent' }}>
          <CardMedia
            component="img"
            image={formData.banner}
            alt="Store Banner"
            sx={{ 
              height: 240, 
              borderRadius: 2,
              objectFit: 'cover'
            }}
          />
        </Card>
      )} */}

      <Box display="flex" alignItems="center" mb={4}>
        <Avatar 
          src={formData.logo} 
          alt={formData.storeName}
          sx={{ 
            width: 80, 
            height: 80,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
          }}
        />
        <Box ml={2}>
          <Typography variant="h4" fontWeight="bold">
            {formData.storeName}
          </Typography>
          {formData.establishedDate && (
            <Box display="flex" alignItems="center" mt={0.5}>
              <CalendarMonth fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                Established {new Date(formData.establishedDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <SectionTitle variant="h6">About</SectionTitle>
          <InfoValue variant="body1">
            {formData.description || 'No description provided'}
          </InfoValue>

          {formData.categories && (
            <Box mb={3}>
              <Box display="flex" alignItems="center" mb={1}>
                <Category fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <InfoLabel>Categories</InfoLabel>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {formData.categories.split(',').map((cat, i) => (
                  <Chip
                    key={i}
                    label={cat.trim()}
                    variant="filled"
                    color="secondary"
                    size="small"
                    sx={{ borderRadius: '4px' }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {formData.returnPolicy && (
            <>
              <Box display="flex" alignItems="center" mb={1}>
                <Policy fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <InfoLabel>Return Policy</InfoLabel>
              </Box>
              <InfoValue variant="body2">
                {formData.returnPolicy}
              </InfoValue>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <SectionTitle variant="h6">Contact Information</SectionTitle>
              
              {formData.website && (
                <Box mb={2}>
                  <Box display="flex" alignItems="center">
                    <Link fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <InfoLabel>Website</InfoLabel>
                  </Box>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    {formData.website}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderEditForm = () => (
    <StyledForm onSubmit={handleSubmit}>
      <SectionTitle variant="h6">Basic Information</SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Store Name"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
            error={!!formErrors.storeName}
            helperText={formErrors.storeName}
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Logo URL"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Enter URL for your store logo"
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Banner URL"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            placeholder="Enter URL for your store banner"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <SectionTitle variant="h6" sx={{ mt: 4 }}>Store Details</SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Store Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            placeholder="Describe your store and what you sell"
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Categories (comma separated)"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="e.g. Electronics, Accessories, Home Decor"
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="e.g. www.yourstore.com"
            error={!!formErrors.website}
            helperText={formErrors.website}
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Established Date"
            name="establishedDate"
            value={formData.establishedDate}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Return Policy"
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleChange}
            multiline
            rows={3}
            placeholder="Describe your store's return and refund policy"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Cancel />}
          onClick={handleCancel}
          size="large"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={<Save />}
          size="large"
        >
          Save Changes
        </Button>
      </Box>
    </StyledForm>
  );

  return (
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Store Details</Typography>
        {!isEditing && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
            size="large"
          >
            Edit Store
          </Button>
        )}
      </Box>

      {!details && !isEditing ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" mb={2}>You haven't set up your store yet</Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Complete your store details to start selling products
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
          >
            Set Up Your Store
          </Button>
        </Box>
      ) : isEditing ? (
        renderEditForm()
      ) : (
        renderStoreView()
      )}
    </StyledPaper>
  );
};

export default StoreDetails;