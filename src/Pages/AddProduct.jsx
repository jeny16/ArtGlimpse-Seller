import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, InputAdornment,
  Divider, Chip, Stack
} from "@mui/material";
import { ImagePlus, Plus, Tag, Package2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const AddProduct = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'INR',
    stock: '',
    category: '',
    discount: false,
    percentage_Discount: '',
    valid_Until_Discount: '',
    processing_Time: '',
    shipping_Time: '',
    shipping_Cost: '',
    estimated_Delivery: '',
    materials_Made: '',
    tags: ''
  });
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProductData = {
      ...productData,
      tags: tags.join(', ')
    };
    console.log('Product Data:', finalProductData);
    console.log('Images:', images);
    navigate('/dashboard');
  };

  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.custom.accent,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.custom.accent,
        borderWidth: 2,
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.custom.accent,
    },
    '& .MuiInputBase-input': {
      color: theme.palette.neutral.main,
    },
    mb: 1,
  };

  return (
    <Box sx={{ 
      // backgroundColor: theme.palette.tints.tint2, 
      minHeight: '100vh', 
      p: { xs: 2, md: 4 }, 
      mt: { xs: 8, md: 16 },
    }}>
      <Paper 
        elevation={2} 
        sx={{ 
          maxWidth: 900, 
          margin: 'auto', 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3,
          backgroundColor: theme.palette.tints.tint3,
          border: `1px solid ${theme.palette.secondary.light}`
        }}
      >
        <Typography variant="h4" sx={{ 
          textAlign: 'center', 
          fontWeight: '600', 
          color: theme.palette.custom.accent, 
          mb: 3,
          borderBottom: `2px solid ${theme.palette.shades.light}`,
          pb: 2,
          fontFamily: theme.typography.h2.fontFamily
        }}>
          ADD NEW PRODUCT
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Package2 size={22} color={theme.palette.custom.accent} />
                <Typography variant="h6" sx={{ 
                  color: theme.palette.custom.accent, 
                  ml: 1,
                  fontWeight: 600,
                  fontFamily: theme.typography.h3.fontFamily
                }}>
                  Product Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, borderColor: theme.palette.shades.light }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                    sx={fieldStyles}
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
                    rows={3}
                    required
                    sx={fieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleInputChange}
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    required
                    sx={fieldStyles}
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
                    sx={fieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={fieldStyles}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={productData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="Jewelry & Accessories">Jewelry & Accessories</MenuItem>
                      <MenuItem value="Home & Living">Home & Living</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Art & Collectibles">Art & Collectibles</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={productData.discount} 
                        onChange={handleInputChange} 
                        name="discount"
                        sx={{ 
                          color: theme.palette.secondary.main,
                          '&.Mui-checked': {
                            color: theme.palette.custom.accent,
                          },
                        }}
                      />
                    }
                    label="Discount Available"
                    sx={{ color: theme.palette.neutral.main }}
                  />
                </Grid>
                {productData.discount && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Discount Percentage"
                        name="percentage_Discount"
                        type="number"
                        value={productData.percentage_Discount}
                        onChange={handleInputChange}
                        required
                        InputProps={{ 
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Discount Valid Until"
                        name="valid_Until_Discount"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={productData.valid_Until_Discount}
                        onChange={handleInputChange}
                        required
                        sx={fieldStyles}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {/* Additional Details Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Tag size={22} color={theme.palette.custom.accent} />
                <Typography variant="h6" sx={{ 
                  color: theme.palette.custom.accent, 
                  ml: 1,
                  fontWeight: 600,
                  fontFamily: theme.typography.h3.fontFamily
                }}>
                  Additional Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, borderColor: theme.palette.shades.light }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Materials"
                    name="materials_Made"
                    value={productData.materials_Made}
                    onChange={handleInputChange}
                    placeholder="e.g. Alloy Metal, Kundan Stones, Beads"
                    sx={fieldStyles}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.neutral.main }}>
                    Product Tags
                  </Typography>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Add tags (press Enter after each tag)"
                      value={tagInput}
                      onChange={handleTagInput}
                      onKeyDown={handleKeyDown}
                      sx={fieldStyles}
                    />
                    <Button 
                      onClick={addTag} 
                      variant="contained"
                      sx={{
                        ml: 1,
                        backgroundColor: theme.palette.custom.accent,
                        fontFamily: theme.typography.button.fontFamily,
                        textTransform: theme.typography.button.textTransform,
                        height: 56, // Match TextField height
                        '&:hover': {
                          backgroundColor: theme.palette.custom.highlight
                        }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                    {tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => removeTag(tag)}
                        sx={{ 
                          m: 0.5, 
                          backgroundColor: theme.palette.shades.light,
                          color: theme.palette.neutral.main,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.neutral.main,
                            '&:hover': {
                              color: theme.palette.custom.highlight
                            }
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>

                {/* Image Upload Section */}
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.neutral.main }}>
                    Product Images
                  </Typography>
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
                      variant="contained" 
                      component="span" 
                      startIcon={<ImagePlus />}
                      sx={{
                        backgroundColor: theme.palette.custom.accent,
                        fontFamily: theme.typography.button.fontFamily,
                        textTransform: theme.typography.button.textTransform,
                        '&:hover': {
                          backgroundColor: theme.palette.custom.highlight
                        }
                      }}
                    >
                      Upload Images
                    </Button>
                  </label>
                </Grid>
                {images.length > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 2, 
                      mt: 1,
                      border: `1px dashed ${theme.palette.shades.medium}`,
                      borderRadius: 2,
                      p: 2,
                      backgroundColor: theme.palette.tints.tint1
                    }}>
                      {images.map((img, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            width: 100, 
                            height: 100, 
                            overflow: 'hidden', 
                            borderRadius: 2, 
                            border: `1px solid ${theme.palette.secondary.light}`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <img 
                            src={img.preview} 
                            alt={`upload-${index}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={<Plus />} 
                  sx={{ 
                    px: 5, 
                    py: 1.5,
                    backgroundColor: theme.palette.custom.accent,
                    color: theme.palette.primary.main,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontFamily: theme.typography.button.fontFamily,
                    textTransform: theme.typography.button.textTransform,
                    '&:hover': {
                      backgroundColor: theme.palette.custom.highlight
                    }
                  }}
                >
                  Add Product
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;