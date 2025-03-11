// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper, 
//   Button, 
//   IconButton, 
//   TextField, 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogActions,
//   Chip,
//   Stack,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel
// } from '@mui/material';
// import { 
//   Edit as EditIcon, 
//   Delete as DeleteIcon, 
//   Add as AddIcon, 
//   Visibility as VisibilityIcon 
// } from '@mui/icons-material';

// const Inventory = () => {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: 'Elegant Silver Earrings',
//       category: 'Jewelry & Accessories',
//       stock: 45,
//       price: 1299,
//       status: 'In Stock'
//     },
//     {
//       id: 2,
//       name: 'Handcrafted Beaded Necklace',
//       category: 'Jewelry & Accessories',
//       stock: 12,
//       price: 2499,
//       status: 'Low Stock'
//     },
//     {
//       id: 3,
//       name: 'Traditional Kundan Bracelet',
//       category: 'Jewelry & Accessories',
//       stock: 0,
//       price: 1799,
//       status: 'Out of Stock'
//     }
//   ]);

//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState({
//     name: '',
//     category: '',
//     stock: '',
//     price: '',
//   });

//   const handleAddProduct = () => {
//     const newProduct = {
//       ...currentProduct,
//       id: products.length + 1,
//       status: currentProduct.stock > 20 ? 'In Stock' : 
//               currentProduct.stock > 0 ? 'Low Stock' : 'Out of Stock'
//     };
//     setProducts([...products, newProduct]);
//     setOpenAddDialog(false);
//     setCurrentProduct({ name: '', category: '', stock: '', price: '' });
//   };

//   const handleEditProduct = (product) => {
//     setCurrentProduct(product);
//     setOpenAddDialog(true);
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(product => product.id !== id));
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'In Stock': return 'success';
//       case 'Low Stock': return 'warning';
//       case 'Out of Stock': return 'error';
//       default: return 'default';
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: 3, mt: 16, backgroundColor: 'background.default' }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Stack 
//             direction="row" 
//             justifyContent="space-between" 
//             alignItems="center" 
//             spacing={2}
//           >
//             <Typography variant="h4" gutterBottom>
//               Manage Inventory
//             </Typography>
//             <Button 
//               sx={{
//                 backgroundColor: "#c17912",
//               }}
//               variant="contained" 
//               startIcon={<AddIcon />} 
//               onClick={() => setOpenAddDialog(true)}
//             >
//               Add Product
//             </Button>
//           </Stack>
//         </Grid>

//         {/* Inventory Summary Cards */}
//         <Grid item xs={12} container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" color="text.secondary">
//                   Total Products
//                 </Typography>
//                 <Typography variant="h4">{products.length}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" color="text.secondary">
//                   In Stock Products
//                 </Typography>
//                 <Typography variant="h4">
//                   {products.filter(p => p.status === 'In Stock').length}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" color="text.secondary">
//                   Low Stock Products
//                 </Typography>
//                 <Typography variant="h4">
//                   {products.filter(p => p.status === 'Low Stock').length}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Inventory Table */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Product Name</TableCell>
//                       <TableCell>Category</TableCell>
//                       <TableCell>Stock</TableCell>
//                       <TableCell>Price</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {products.map((product) => (
//                       <TableRow key={product.id}>
//                         <TableCell>{product.name}</TableCell>
//                         <TableCell>{product.category}</TableCell>
//                         <TableCell>{product.stock}</TableCell>
//                         <TableCell>₹{product.price}</TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={product.status} 
//                             color={getStatusColor(product.status)} 
//                             size="small" 
//                           />
//                         </TableCell>
//                         <TableCell align="right">
//                           <IconButton onClick={() => handleEditProduct(product)}>
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton onClick={() => handleDeleteProduct(product.id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Add/Edit Product Dialog */}
//       <Dialog 
//         open={openAddDialog} 
//         onClose={() => setOpenAddDialog(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           {currentProduct.id ? 'Edit Product' : 'Add New Product'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Product Name"
//                 value={currentProduct.name}
//                 onChange={(e) => setCurrentProduct({
//                   ...currentProduct, 
//                   name: e.target.value
//                 })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   value={currentProduct.category}
//                   label="Category"
//                   onChange={(e) => setCurrentProduct({
//                     ...currentProduct, 
//                     category: e.target.value
//                   })}
//                 >
//                   <MenuItem value="Jewelry & Accessories">
//                     Jewelry & Accessories
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Stock"
//                 type="number"
//                 value={currentProduct.stock}
//                 onChange={(e) => setCurrentProduct({
//                   ...currentProduct, 
//                   stock: e.target.value
//                 })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Price"
//                 type="number"
//                 value={currentProduct.price}
//                 onChange={(e) => setCurrentProduct({
//                   ...currentProduct, 
//                   price: e.target.value
//                 })}
//                 InputProps={{
//                   startAdornment: '₹'
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
//           <Button 
//             variant="contained" 
//             onClick={handleAddProduct}
//           >
//             {currentProduct.id ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Inventory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  IconButton, 
  Chip,
  Stack,
  TablePagination
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon
} from '@mui/icons-material';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/products');
      const updatedProducts = response.data.map(product => ({
        ...product,
        status: product.stock > 10 ? 'In Stock' : 
                product.stock > 5 ? 'Low Stock' : 'Out of Stock'
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'error';
      default: return 'default';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 16, backgroundColor: 'background.default' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={2}
          >
            <Typography variant="h4" gutterBottom>
              Manage Inventory
            </Typography>
            <Button 
              sx={{ backgroundColor: "#c17912" }}
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => {}}
            >
              Add Product
            </Button>
          </Stack>
        </Grid>

        {/* Inventory Summary Cards */}
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Products
                </Typography>
                <Typography variant="h4">{products.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  In Stock Products
                </Typography>
                <Typography variant="h4">
                  {products.filter(p => p.stock > 10).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Low Stock Products
                </Typography>
                <Typography variant="h4">
                  {products.filter(p => p.stock > 0 && p.stock <= 5).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Inventory Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => {
                  const productId = product._id?.$oid || product._id || index;
                  return (
                    <TableRow key={productId}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.categories}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.currency} {product.price}</TableCell>
                      <TableCell>
                        <Chip label={product.status} color={getStatusColor(product.status)} size="small" />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => {}}><EditIcon /></IconButton>
                        <IconButton onClick={() => {}}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inventory;
