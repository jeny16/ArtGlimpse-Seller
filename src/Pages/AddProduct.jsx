// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   InputAdornment,
//   Chip,
//   Stack,
//   IconButton,
//   Card,
//   CircularProgress,
//   Divider,
//   Paper,
//   useTheme,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   alpha
// } from "@mui/material";
// import {
//   ImagePlus,
//   Tag,
//   Package2,
//   X,
//   Save,
//   ShoppingBag,
//   // PriceTag,
//   CalendarDays,
//   Truck,
//   Map,
//   ArrowLeft
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createProduct, updateProduct, resetProductState } from '../store/addProductSlice';
// import { FormField } from '../components/index';
// import { useNavigate } from 'react-router-dom';

// const AddProduct = ({ initialValues = null, mode = "create", onClose }) => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, success } = useSelector((state) => state.addProduct);

//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category: '',
//     discount: false,
//     percentage_Discount: '',
//     materials_Made: '',
//     tags: [],
//     valid_Until_Discount: '',
//     processing_Time: '',
//     shipping_Time: '',
//     shipping_Cost: '',
//     estimated_Delivery: '',
//     countries_Available: ''
//   });
//   const [images, setImages] = useState([]);
//   const [tagInput, setTagInput] = useState('');
//   const [successDialogOpen, setSuccessDialogOpen] = useState(false);

//   // When editing, initialize form values from the provided product data
//   useEffect(() => {
//     if (initialValues) {
//       setProductData({
//         name: initialValues.name || '',
//         description: initialValues.description || '',
//         price: initialValues.price || '',
//         stock: initialValues.stock || '',
//         category: initialValues.categories || '',
//         discount: initialValues.discount || false,
//         percentage_Discount: initialValues.percentage_Discount || '',
//         materials_Made: Array.isArray(initialValues.materials_Made)
//           ? initialValues.materials_Made.join(', ')
//           : initialValues.materials_Made || '',
//         tags: initialValues.tags || [],
//         valid_Until_Discount: initialValues.valid_Until_Discount || '',
//         processing_Time: initialValues.processing_Time || '',
//         shipping_Time: initialValues.shipping_Time || '',
//         shipping_Cost: initialValues.shipping_Cost || '',
//         estimated_Delivery: initialValues.estimated_Delivery || '',
//         countries_Available: Array.isArray(initialValues.countries_Available)
//           ? initialValues.countries_Available.join(', ')
//           : initialValues.countries_Available || ''
//       });
//       // For images, if editing, use existing image URLs as previews.
//       setImages(
//         (initialValues.images || []).map((img) => ({ file: null, preview: img }))
//       );
//     }
//   }, [initialValues]);

//   useEffect(() => {
//     if (success) {
//       setSuccessDialogOpen(true);
//     }
//   }, [success]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProductData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length) {
//       const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
//       setImages((prev) => [...prev, ...newImages]);
//     }
//   };

//   const addTag = () => {
//     if (tagInput.trim() !== '' && !productData.tags.includes(tagInput.trim())) {
//       setProductData({ ...productData, tags: [...productData.tags, tagInput.trim()] });
//       setTagInput('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setProductData({ ...productData, tags: productData.tags.filter((tag) => tag !== tagToRemove) });
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     if (newImages[index].preview) URL.revokeObjectURL(newImages[index].preview);
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   const handleSuccessDialogClose = () => {
//     setSuccessDialogOpen(false);
//     dispatch(resetProductState());
//     if (mode === "create") {
//       navigate('/inventory');
//     } else if (mode === "edit" && onClose) {
//       onClose();
//     }
//   };

//   const handleCancel = () => {
//     if (mode === "create") {
//       navigate('/inventory');
//     } else if (mode === "edit" && onClose) {
//       onClose();
//     }
//   };

//   const handleSubmit = () => {
//     const formData = new FormData();
//     // Append basic fields
//     formData.append('name', productData.name);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('stock', productData.stock);
//     formData.append('category', productData.category);
//     formData.append('discount', productData.discount);
//     if (productData.discount && productData.percentage_Discount) {
//       formData.append('percentage_Discount', productData.percentage_Discount);
//     }
//     // Append materials (as CSV string)
//     formData.append('materials_Made', productData.materials_Made);
//     // Append tags
//     productData.tags.forEach((tag) => formData.append('tags', tag));
//     // Append additional fields
//     formData.append('valid_Until_Discount', productData.valid_Until_Discount);
//     formData.append('processing_Time', productData.processing_Time);
//     formData.append('shipping_Time', productData.shipping_Time);
//     formData.append('shipping_Cost', productData.shipping_Cost);
//     formData.append('estimated_Delivery', productData.estimated_Delivery);
//     formData.append('countries_Available', productData.countries_Available);
//     // Append images: new file if available, otherwise the preview URL (existing image)
//     images.forEach((img) => {
//       if (img.file) {
//         formData.append('images', img.file);
//       } else {
//         formData.append('images', img.preview);
//       }
//     });

//     if (mode === "create") {
//       dispatch(createProduct(formData));
//     } else if (mode === "edit" && initialValues) {
//       // Append product id if necessary
//       formData.append('id', initialValues.id);
//       dispatch(updateProduct({ id: initialValues.id, update: formData }));
//     }
//   };

//   const sectionStyles = {
//     card: {
//       p: 3,
//       mb: 3,
//       borderRadius: 2,
//       boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//       border: `1px solid ${alpha(theme.palette.custom.highlight, 0.1)}`,
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
//       }
//     },
//     sectionTitle: {
//       mb: 3,
//       display: 'flex',
//       alignItems: 'center',
//       color: theme.palette.custom.highlight,
//       fontWeight: 600,
//       '& svg': {
//         mr: 1.5,
//         color: theme.palette.custom.highlight
//       }
//     },
//     divider: {
//       my: 2,
//       borderColor: alpha(theme.palette.custom.highlight, 0.1)
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
//         <Stack direction="row" spacing={1} alignItems="center">
//           {mode === "create" && (
//             <IconButton
//               onClick={handleCancel}
//               sx={{ color: theme.palette.custom.highlight, mr: 1 }}
//             >
//               <ArrowLeft size={20} />
//             </IconButton>
//           )}
//           <Typography variant="h5" fontWeight={600} color={theme.palette.custom.highlight}>
//             {mode === "create" ? "Add New Product" : "Edit Product"}
//           </Typography>
//         </Stack>
//       </Box>

//       {error && (
//         <Paper
//           sx={{
//             p: 2,
//             mb: 3,
//             bgcolor: alpha(theme.palette.error.main, 0.1),
//             color: theme.palette.error.main,
//             borderRadius: 2
//           }}
//         >
//           <Typography>{error}</Typography>
//         </Paper>
//       )}

//       <Grid container spacing={3}>
//         {/* Left Column: Main Product Details */}
//         <Grid item xs={12} md={8}>
//           <Card sx={sectionStyles.card}>
//             <Typography variant="h6" sx={sectionStyles.sectionTitle}>
//               <Package2 size={24} />
//               Product Details
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <FormField
//                   label="Product Name"
//                   name="name"
//                   value={productData.name}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter product name"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormField
//                   label="Description"
//                   name="description"
//                   value={productData.description}
//                   onChange={handleInputChange}
//                   multiline
//                   rows={4}
//                   required
//                   placeholder="Describe your product in detail"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControl fullWidth variant="outlined" sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: theme.palette.custom.highlight,
//                   },
//                   '& .MuiInputLabel.Mui-focused': {
//                     color: theme.palette.custom.highlight,
//                   }
//                 }}>
//                   <InputLabel>Category</InputLabel>
//                   <Select
//                     name="category"
//                     value={productData.category}
//                     onChange={handleInputChange}
//                     required
//                     label="Category"
//                   >
//                     <MenuItem value="Jewelry & Accessories">Jewelry & Accessories</MenuItem>
//                     <MenuItem value="Clothing">Clothing</MenuItem>
//                     <MenuItem value="Home & Living">Home & Living</MenuItem>
//                     <MenuItem value="Pooja Essentials">Pooja Essentials</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <FormField
//                   label="Materials"
//                   name="materials_Made"
//                   value={productData.materials_Made}
//                   onChange={handleInputChange}
//                   placeholder="Cotton, Silk, Wood, etc. (comma separated)"
//                 />
//               </Grid>
//             </Grid>
//           </Card>

//           <Card sx={sectionStyles.card}>
//             <Typography variant="h6" sx={sectionStyles.sectionTitle}>
//               {/* <PriceTag size={24} /> */}
//               <Save size={24} />
//               Pricing & Inventory
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <FormField
//                   label="Price"
//                   name="price"
//                   type="number"
//                   value={productData.price}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">₹</InputAdornment>
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormField
//                   label="Stock"
//                   name="stock"
//                   type="number"
//                   value={productData.stock}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={productData.discount}
//                       onChange={handleInputChange}
//                       name="discount"
//                       color="default"
//                       sx={{
//                         color: theme.palette.custom.highlight,
//                         '&.Mui-checked': {
//                           color: theme.palette.custom.highlight,
//                         },
//                       }}
//                     />
//                   }
//                   label="Enable Discount"
//                 />

//                 {productData.discount && (
//                   <Box sx={{ ml: 3, mt: 1 }}>
//                     <FormField
//                       label="Discount Percentage"
//                       name="percentage_Discount"
//                       type="number"
//                       value={productData.percentage_Discount}
//                       onChange={handleInputChange}
//                       InputProps={{
//                         endAdornment: <InputAdornment position="end">%</InputAdornment>
//                       }}
//                       size="small"
//                     />
//                     <FormField
//                       label="Valid Until"
//                       name="valid_Until_Discount"
//                       type="date"
//                       value={productData.valid_Until_Discount}
//                       onChange={handleInputChange}
//                     />
//                   </Box>
//                 )}
//               </Grid>
//             </Grid>
//           </Card>

//           <Card sx={sectionStyles.card}>
//             <Typography variant="h6" sx={sectionStyles.sectionTitle}>
//               <Truck size={24} />
//               Shipping & Delivery
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <FormField
//                   label="Processing Time"
//                   name="processing_Time"
//                   value={productData.processing_Time}
//                   onChange={handleInputChange}
//                   placeholder="e.g., 1-3 business days"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormField
//                   label="Shipping Time"
//                   name="shipping_Time"
//                   value={productData.shipping_Time}
//                   onChange={handleInputChange}
//                   placeholder="e.g., 3-5 business days"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormField
//                   label="Shipping Cost"
//                   name="shipping_Cost"
//                   type="number"
//                   value={productData.shipping_Cost}
//                   onChange={handleInputChange}
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">₹</InputAdornment>
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormField
//                   label="Estimated Delivery"
//                   name="estimated_Delivery"
//                   type="date"
//                   value={productData.estimated_Delivery}
//                   onChange={handleInputChange}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormField
//                   label="Available Countries"
//                   name="countries_Available"
//                   value={productData.countries_Available}
//                   onChange={handleInputChange}
//                   placeholder="India, USA, UK, etc. (comma separated)"
//                 />
//               </Grid>
//             </Grid>
//           </Card>
//         </Grid>

//         {/* Right Column: Images and Tags */}
//         <Grid item xs={12} md={4}>
//           <Card sx={sectionStyles.card}>
//             <Typography variant="h6" sx={sectionStyles.sectionTitle}>
//               <ImagePlus size={24} />
//               Product Images
//             </Typography>

//             <input
//               accept="image/*"
//               style={{ display: 'none' }}
//               id="upload-images"
//               multiple
//               type="file"
//               onChange={handleImageUpload}
//             />
//             <label htmlFor="upload-images">
//               <Button
//                 variant="outlined"
//                 component="span"
//                 startIcon={<ImagePlus />}
//                 fullWidth
//                 sx={{
//                   py: 1.5,
//                   borderStyle: 'dashed',
//                   borderWidth: 1,
//                   borderColor: theme.palette.custom.highlight,
//                   color: theme.palette.custom.highlight,
//                   '&:hover': {
//                     borderColor: theme.palette.custom.accent,
//                     backgroundColor: alpha(theme.palette.custom.highlight, 0.04)
//                   }
//                 }}
//               >
//                 Upload Images
//               </Button>
//             </label>

//             <Box sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 {images.map((img, index) => (
//                   <Grid item xs={6} key={index}>
//                     <Box
//                       sx={{
//                         position: 'relative',
//                         borderRadius: 1,
//                         overflow: 'hidden',
//                         height: 120,
//                         border: `1px solid ${alpha(theme.palette.custom.highlight, 0.2)}`,
//                       }}
//                     >
//                       <img
//                         src={img.preview}
//                         alt={`Product ${index}`}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                       />
//                       <IconButton
//                         size="small"
//                         onClick={() => removeImage(index)}
//                         sx={{
//                           position: 'absolute',
//                           top: 4,
//                           right: 4,
//                           bgcolor: 'rgba(255,255,255,0.7)',
//                           '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//                         }}
//                       >
//                         <X size={16} color={theme.palette.error.main} />
//                       </IconButton>
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           </Card>

//           <Card sx={sectionStyles.card}>
//             <Typography variant="h6" sx={sectionStyles.sectionTitle}>
//               <Tag size={24} />
//               Product Tags
//             </Typography>

//             <Box sx={{ mb: 3, display: 'flex' }}>
//               <FormField
//                 label="Add Tag"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag and press Add"
//                 onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
//                 fullWidth
//                 sx={{ mb: 0 }}
//               />
//               <Button
//                 onClick={addTag}
//                 variant="contained"
//                 sx={{
//                   ml: 1,
//                   bgcolor: theme.palette.custom.highlight,
//                   '&:hover': { bgcolor: theme.palette.custom.accent },
//                   height: 56,
//                   minWidth: 80
//                 }}
//               >
//                 Add
//               </Button>
//             </Box>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {productData.tags.map((tag, index) => (
//                 <Chip
//                   key={index}
//                   label={tag}
//                   onDelete={() => removeTag(tag)}
//                   sx={{
//                     bgcolor: alpha(theme.palette.custom.highlight, 0.1),
//                     color: theme.palette.custom.highlight,
//                     borderRadius: '16px',
//                     '& .MuiChip-deleteIcon': {
//                       color: theme.palette.custom.highlight,
//                       '&:hover': { color: theme.palette.error.main }
//                     }
//                   }}
//                 />
//               ))}
//             </Box>
//           </Card>

//           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
//             <Button
//               variant="outlined"
//               onClick={handleCancel}
//               sx={{
//                 borderColor: theme.palette.custom.highlight,
//                 color: theme.palette.custom.highlight,
//                 '&:hover': {
//                   borderColor: theme.palette.custom.accent,
//                   backgroundColor: alpha(theme.palette.custom.highlight, 0.04)
//                 },
//                 px: 4
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />}
//               disabled={isLoading}
//               sx={{
//                 bgcolor: theme.palette.custom.highlight,
//                 color: '#ffffff',
//                 '&:hover': { bgcolor: theme.palette.custom.accent },
//                 '&:disabled': { bgcolor: alpha(theme.palette.custom.highlight, 0.6) },
//                 px: 4
//               }}
//             >
//               {isLoading ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Success Dialog */}
//       <Dialog
//         open={successDialogOpen}
//         onClose={handleSuccessDialogClose}
//         maxWidth="xs"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             px: 2
//           }
//         }}
//       >
//         <DialogTitle sx={{ color: theme.palette.custom.highlight, fontWeight: 600 }}>
//           Success!
//         </DialogTitle>
//         <DialogContent>
//           <Typography>
//             {mode === 'create'
//               ? 'Product has been successfully created.'
//               : 'Product has been successfully updated.'}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleSuccessDialogClose}
//             sx={{
//               color: theme.palette.custom.highlight,
//               '&:hover': { bgcolor: alpha(theme.palette.custom.highlight, 0.04) }
//             }}
//           >
//             Continue
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AddProduct;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Chip,
  Stack,
  IconButton,
  Card,
  CircularProgress
} from "@mui/material";
import { ImagePlus, Tag, Package2, X, Save } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetAddProductState } from '../store/addProductSlice'; // Adjust the import path as needed

const AddProduct = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { product, isLoading, error, success } = useSelector((state) => state.addProduct);

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

  // Use FormData for file upload
  const handleSubmit = () => {
    const form = new FormData();

    form.append('name', productData.name);
    form.append('description', productData.description);
    form.append('price', productData.price);
    form.append('stock', productData.stock);
    form.append('category', productData.category);
    form.append('discount', productData.discount);
    form.append('percentage_Discount', productData.percentage_Discount);

    const materialsArray = productData.materials_Made
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    materialsArray.forEach((material) => {
      form.append('materials_Made', material);
    });

    productData.tags.forEach((tag) => {
      form.append('tags', tag);
    });

    images.forEach((img, index) => {
      form.append(`image_${index}`, img.file);
    });


    const storedUser = localStorage.getItem('user');
    let sellerId = '';
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        sellerId = parsedUser.user?.id || parsedUser.sellerId || '';
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }

    dispatch(createProduct(form));
  };

  // Clear form and reset state on successful product creation
  useEffect(() => {
    if (success) {
      setProductData({
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
      setImages([]);
      dispatch(resetAddProductState());
    }
  }, [success, dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5' }}>
      <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: '600', mb: 4, pt: 3 }}>
          Add New Product
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" sx={{ mb: 2 }}>
            Product added successfully!
          </Typography>
        )}

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
                  variant="contained"
                  component="span"
                  startIcon={<ImagePlus />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    backgroundColor: "#c17912"
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
                  variant="contained"
                  sx={{
                    backgroundColor: "#c17912",
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />}
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Product'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;