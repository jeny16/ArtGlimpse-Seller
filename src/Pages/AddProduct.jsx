import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel, InputAdornment, Divider, Chip, Stack, IconButton, Card
} from "@mui/material";
import { ImagePlus, Plus, Tag, Package2, X, Save, ArrowRight } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const AddProduct = () => {
  const theme = useTheme();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    discount: false,
    percentage_Discount: '',
    materials_Made: '',
    tags: []
  });
  const [images, setImages] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const addTag = () => {
    if (tagInput.trim() !== '' && !productData.tags.includes(tagInput.trim())) {
      setProductData({ ...productData, tags: [...productData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData({ ...productData, tags: productData.tags.filter((tag) => tag !== tagToRemove) });
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      p: { xs: 2, md: 4 }, 
      backgroundColor: '#f5f5f5'
    }}>
      <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: '600', mb: 4, pt: 3 }}>
          Add New Product
        </Typography>
        
        <Grid container spacing={3}>
          {/* Left Column - Main Details */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                <Package2 size={20} style={{ marginRight: 8 }} /> 
                Product Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Product Name" 
                    name="name" 
                    value={productData.name} 
                    onChange={handleInputChange} 
                    required 
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Description" 
                    name="description" 
                    value={productData.description} 
                    onChange={handleInputChange} 
                    multiline 
                    rows={4} 
                    required 
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select 
                      name="category" 
                      value={productData.category} 
                      onChange={handleInputChange} 
                      required
                      label="Category"
                    >
                      <MenuItem value="Jewelry & Accessories">Jewelry & Accessories</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Home & Living">Home & Living</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Materials" 
                    name="materials_Made" 
                    value={productData.materials_Made} 
                    onChange={handleInputChange} 
                  />
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Pricing & Inventory</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Price" 
                    name="price" 
                    type="number" 
                    value={productData.price} 
                    onChange={handleInputChange} 
                    required 
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start">₹</InputAdornment> 
                    }} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Stock" 
                    name="stock" 
                    type="number" 
                    value={productData.stock} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={productData.discount} onChange={handleInputChange} name="discount" color="primary" />}
                    label="Enable Discount"
                  />
                  
                  {productData.discount && (
                    <Box sx={{ ml: 3, mt: 2 }}>
                      <TextField 
                        label="Discount Percentage" 
                        name="percentage_Discount" 
                        type="number" 
                        value={productData.percentage_Discount} 
                        onChange={handleInputChange} 
                        InputProps={{ 
                          endAdornment: <InputAdornment position="end">%</InputAdornment> 
                        }}
                        size="small"
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Right Column - Images and Tags */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Product Images</Typography>
              
              <input 
                accept="image/*" 
                style={{ display: 'none' }} 
                id="upload-images" 
                multiple 
                type="file" 
                onChange={handleImageUpload} 
              />
              <label htmlFor="upload-images">
                <Button 
                  variant="primary" 
                  component="span" 
                  startIcon={<ImagePlus />} 
                  fullWidth
                  sx={{ 
                    py: 1.5, 
                    borderStyle: 'dashed', 
                    borderWidth: 1,
                    background: "#c17912",
                  }}
                >
                  Upload Images
                </Button>
              </label>
              
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {images.map((img, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ 
                        position: 'relative', 
                        borderRadius: 1,
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <img 
                          src={img.preview} 
                          alt={`upload-${index}`} 
                          style={{ 
                            width: '100%', 
                            height: 120, 
                            objectFit: 'cover' 
                          }} 
                        />
                        <IconButton 
                          size="small" 
                          sx={{ 
                            position: 'absolute', 
                            top: 4, 
                            right: 4, 
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.9)'
                            }
                          }}
                          onClick={() => removeImage(index)}
                        >
                          <X size={16} />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Card>

            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Product Tags</Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField 
                  placeholder="Add tag" 
                  value={tagInput} 
                  onChange={(e) => setTagInput(e.target.value)} 
                  sx={{ flex: 1 }}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Tag size={16} /></InputAdornment>,
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button 
                  variant="primary"
                  sx={{
                    background: "#c17912",
                  }}
                  onClick={addTag}
                >
                  Add
                </Button>
              </Stack>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {productData.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    onDelete={() => removeTag(tag)} 
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Footer Submit Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 4, 
          mb: 4 
        }}>
          <Button 
            variant="contained" 
            startIcon={<Save />} 
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Save Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;