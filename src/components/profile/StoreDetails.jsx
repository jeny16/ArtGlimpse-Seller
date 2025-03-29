import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  TextField, 
  Grid, 
  Box, 
  IconButton,
  Chip,
  Avatar
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';

const StoreDetails = ({ storeData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    storeName: storeData?.name || '',
    description: storeData?.description || '',
    logo: storeData?.logo || '',
    banner: storeData?.banner || '',
    categories: storeData?.categories?.join(', ') || '',
    website: storeData?.website || '',
    establishedDate: storeData?.establishedDate || '',
    returnPolicy: storeData?.returnPolicy || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      categories: formData.categories.split(',').map(cat => cat.trim()).filter(Boolean)
    };
    
    // Uncomment when Redux slice is ready
    // dispatch(updateStoreDetails({ storeId: storeData?.id, storeData: processedData }));
    setIsEditing(false);
  };

  const renderViewMode = () => (
    <Grid container spacing={3}>
      {storeData?.logo && (
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar 
              src={storeData.logo} 
              alt={`${storeData.name} logo`} 
              sx={{ width: 80, height: 80 }} 
            />
            <Typography variant="h6">{storeData.name}</Typography>
          </Box>
        </Grid>
      )}

      {storeData?.banner && (
        <Grid item xs={12}>
          <img 
            src={storeData.banner} 
            alt={`${storeData.name} banner`} 
            style={{ 
              width: '100%', 
              height: 200, 
              objectFit: 'cover', 
              borderRadius: 8 
            }} 
          />
        </Grid>
      )}

      {[
        { label: 'Store Name', value: storeData?.name },
        { label: 'Description', value: storeData?.description },
        { label: 'Website', value: storeData?.website },
        { label: 'Established Date', value: storeData?.establishedDate 
          ? new Date(storeData.establishedDate).toLocaleDateString() 
          : null },
        { label: 'Return Policy', value: storeData?.returnPolicy }
      ].map((item, index) => (
        <Grid item xs={12} key={index}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="text.secondary">
                {item.label}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {item.value || 'Not provided'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}

      {storeData?.categories && (
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Categories
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {storeData.categories.map(category => (
                  <Chip 
                    key={category} 
                    label={category} 
                    size="small" 
                    color="default" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );

  const renderEditMode = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Store Name"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Logo URL"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
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
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Store Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Categories"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            variant="outlined"
            placeholder="Electronics, Clothing, etc. (comma separated)"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            variant="outlined"
            type="url"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Established Date"
            name="establishedDate"
            value={formData.establishedDate}
            onChange={handleChange}
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Return Policy"
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button 
              variant="outlined" 
              color="secondary" 
              startIcon={<Cancel />}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              startIcon={<Save />}
            >
              Save Store Details
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Store Details
        </Typography>
        {!isEditing && (
          <Button 
            variant="outlined" 
            color="secondary" 
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
          >
            Edit Store
          </Button>
        )}
      </Box>

      {!storeData && !isEditing ? (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          p={3} 
          bgcolor="grey.200" 
          color="text.primary" 
          borderRadius={2}
        >
          <Typography>
            You haven't set up your store yet. Click 'Edit Store' to get started.
          </Typography>
        </Box>
      ) : isEditing ? (
        renderEditMode()
      ) : (
        renderViewMode()
      )}
    </Paper>
  );
};

export default StoreDetails;