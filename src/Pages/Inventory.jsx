// // import React, { useState } from 'react';
// // import { 
// //   Box, 
// //   Typography, 
// //   Grid, 
// //   Card, 
// //   CardContent, 
// //   Table, 
// //   TableBody, 
// //   TableCell, 
// //   TableContainer, 
// //   TableHead, 
// //   TableRow, 
// //   Paper, 
// //   Button, 
// //   IconButton, 
// //   TextField, 
// //   Dialog, 
// //   DialogTitle, 
// //   DialogContent, 
// //   DialogActions,
// //   Chip,
// //   Stack,
// //   MenuItem,
// //   Select,
// //   FormControl,
// //   InputLabel
// // } from '@mui/material';
// // import { 
// //   Edit as EditIcon, 
// //   Delete as DeleteIcon, 
// //   Add as AddIcon, 
// //   Visibility as VisibilityIcon 
// // } from '@mui/icons-material';

// // const Inventory = () => {
// //   const [products, setProducts] = useState([
// //     {
// //       id: 1,
// //       name: 'Elegant Silver Earrings',
// //       category: 'Jewelry & Accessories',
// //       stock: 45,
// //       price: 1299,
// //       status: 'In Stock'
// //     },
// //     {
// //       id: 2,
// //       name: 'Handcrafted Beaded Necklace',
// //       category: 'Jewelry & Accessories',
// //       stock: 12,
// //       price: 2499,
// //       status: 'Low Stock'
// //     },
// //     {
// //       id: 3,
// //       name: 'Traditional Kundan Bracelet',
// //       category: 'Jewelry & Accessories',
// //       stock: 0,
// //       price: 1799,
// //       status: 'Out of Stock'
// //     }
// //   ]);

// //   const [openAddDialog, setOpenAddDialog] = useState(false);
// //   const [currentProduct, setCurrentProduct] = useState({
// //     name: '',
// //     category: '',
// //     stock: '',
// //     price: '',
// //   });

// //   const handleAddProduct = () => {
// //     const newProduct = {
// //       ...currentProduct,
// //       id: products.length + 1,
// //       status: currentProduct.stock > 20 ? 'In Stock' : 
// //               currentProduct.stock > 0 ? 'Low Stock' : 'Out of Stock'
// //     };
// //     setProducts([...products, newProduct]);
// //     setOpenAddDialog(false);
// //     setCurrentProduct({ name: '', category: '', stock: '', price: '' });
// //   };

// //   const handleEditProduct = (product) => {
// //     setCurrentProduct(product);
// //     setOpenAddDialog(true);
// //   };

// //   const handleDeleteProduct = (id) => {
// //     setProducts(products.filter(product => product.id !== id));
// //   };

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'In Stock': return 'success';
// //       case 'Low Stock': return 'warning';
// //       case 'Out of Stock': return 'error';
// //       default: return 'default';
// //     }
// //   };

// //   return (
// //     <Box sx={{ flexGrow: 1, p: 3, mt: 16, backgroundColor: 'background.default' }}>
// //       <Grid container spacing={3}>
// //         <Grid item xs={12}>
// //           <Stack 
// //             direction="row" 
// //             justifyContent="space-between" 
// //             alignItems="center" 
// //             spacing={2}
// //           >
// //             <Typography variant="h4" gutterBottom>
// //               Manage Inventory
// //             </Typography>
// //             <Button 
// //               sx={{
// //                 backgroundColor: "#c17912",
// //               }}
// //               variant="contained" 
// //               startIcon={<AddIcon />} 
// //               onClick={() => setOpenAddDialog(true)}
// //             >
// //               Add Product
// //             </Button>
// //           </Stack>
// //         </Grid>

// //         {/* Inventory Summary Cards */}
// //         <Grid item xs={12} container spacing={2}>
// //           <Grid item xs={12} md={4}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6" color="text.secondary">
// //                   Total Products
// //                 </Typography>
// //                 <Typography variant="h4">{products.length}</Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //           <Grid item xs={12} md={4}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6" color="text.secondary">
// //                   In Stock Products
// //                 </Typography>
// //                 <Typography variant="h4">
// //                   {products.filter(p => p.status === 'In Stock').length}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //           <Grid item xs={12} md={4}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6" color="text.secondary">
// //                   Low Stock Products
// //                 </Typography>
// //                 <Typography variant="h4">
// //                   {products.filter(p => p.status === 'Low Stock').length}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Grid>

// //         {/* Inventory Table */}
// //         <Grid item xs={12}>
// //           <Card>
// //             <CardContent>
// //               <TableContainer>
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow>
// //                       <TableCell>Product Name</TableCell>
// //                       <TableCell>Category</TableCell>
// //                       <TableCell>Stock</TableCell>
// //                       <TableCell>Price</TableCell>
// //                       <TableCell>Status</TableCell>
// //                       <TableCell align="right">Actions</TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {products.map((product) => (
// //                       <TableRow key={product.id}>
// //                         <TableCell>{product.name}</TableCell>
// //                         <TableCell>{product.category}</TableCell>
// //                         <TableCell>{product.stock}</TableCell>
// //                         <TableCell>₹{product.price}</TableCell>
// //                         <TableCell>
// //                           <Chip 
// //                             label={product.status} 
// //                             color={getStatusColor(product.status)} 
// //                             size="small" 
// //                           />
// //                         </TableCell>
// //                         <TableCell align="right">
// //                           <IconButton onClick={() => handleEditProduct(product)}>
// //                             <EditIcon />
// //                           </IconButton>
// //                           <IconButton onClick={() => handleDeleteProduct(product.id)}>
// //                             <DeleteIcon />
// //                           </IconButton>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* Add/Edit Product Dialog */}
// //       <Dialog 
// //         open={openAddDialog} 
// //         onClose={() => setOpenAddDialog(false)}
// //         fullWidth
// //         maxWidth="sm"
// //       >
// //         <DialogTitle>
// //           {currentProduct.id ? 'Edit Product' : 'Add New Product'}
// //         </DialogTitle>
// //         <DialogContent>
// //           <Grid container spacing={2} sx={{ mt: 1 }}>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Product Name"
// //                 value={currentProduct.name}
// //                 onChange={(e) => setCurrentProduct({
// //                   ...currentProduct, 
// //                   name: e.target.value
// //                 })}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <FormControl fullWidth>
// //                 <InputLabel>Category</InputLabel>
// //                 <Select
// //                   value={currentProduct.category}
// //                   label="Category"
// //                   onChange={(e) => setCurrentProduct({
// //                     ...currentProduct, 
// //                     category: e.target.value
// //                   })}
// //                 >
// //                   <MenuItem value="Jewelry & Accessories">
// //                     Jewelry & Accessories
// //                   </MenuItem>
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Stock"
// //                 type="number"
// //                 value={currentProduct.stock}
// //                 onChange={(e) => setCurrentProduct({
// //                   ...currentProduct, 
// //                   stock: e.target.value
// //                 })}
// //               />
// //             </Grid>
// //             <Grid item xs={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Price"
// //                 type="number"
// //                 value={currentProduct.price}
// //                 onChange={(e) => setCurrentProduct({
// //                   ...currentProduct, 
// //                   price: e.target.value
// //                 })}
// //                 InputProps={{
// //                   startAdornment: '₹'
// //                 }}
// //               />
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
// //           <Button 
// //             variant="contained" 
// //             onClick={handleAddProduct}
// //           >
// //             {currentProduct.id ? 'Update' : 'Add'}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default Inventory;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchInventory, deleteProduct, updateProduct } from "../store/inventorySlice";
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
//   Chip,
//   Stack,
//   TablePagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

// const Inventory = () => {
//   const dispatch = useDispatch();
//   const { inventoryItems, isLoading, error } = useSelector((state) => state.inventory);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Use 'categories' to match the product model field
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState({
//     id: "",
//     categories: "",
//     stock: 0,
//     price: 0,
//   });

//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const user = JSON.parse(userData);
//       const sellerId = user.sellerId;
//       if (sellerId) {
//         dispatch(fetchInventory(sellerId));
//       } else {
//         console.error("Seller ID is missing in localStorage.");
//       }
//     }
//   }, [dispatch]);

//   const products = inventoryItems;

//   const computeStatus = (stock, status) => {
//     if (status) return status;
//     if (stock === 0) return "Out of Stock";
//     if (stock < 10) return "Low Stock";
//     if (stock > 15) return "In Stock";
//     return "Normal Stock";
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "In Stock":
//         return "success";
//       case "Low Stock":
//         return "warning";
//       case "Out of Stock":
//         return "error";
//       case "Normal Stock":
//         return "default";
//       default:
//         return "default";
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEditOpen = (product) => {
//     setEditingProduct({
//       id: product.id,
//       categories: product.categories || "",
//       stock: product.stock,
//       price: product.price,
//     });
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditDialogOpen(false);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingProduct((prev) => ({
//       ...prev,
//       [name]: name === "stock" || name === "price" ? Number(value) : value,
//     }));
//   };

//   const handleEditSubmit = () => {
//     // Retrieve sellerId from localStorage and dispatch the update action
//     const userData = localStorage.getItem("user");
//     let sellerId = "";
//     if (userData) {
//       const user = JSON.parse(userData);
//       sellerId = user.sellerId;
//     }
//     dispatch(updateProduct({ id: editingProduct.id, update: editingProduct, sellerId }));
//     setEditDialogOpen(false);
//   };

//   const handleDeleteClick = (product) => {
//     setProductToDelete(product);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     if (productToDelete) {
//       dispatch(deleteProduct(productToDelete.id));
//       setDeleteDialogOpen(false);
//       setProductToDelete(null);
//     }
//   };

//   const handleDeleteCancel = () => {
//     setDeleteDialogOpen(false);
//     setProductToDelete(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: 3, mt: 16, backgroundColor: "background.default" }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//             <Typography variant="h4" gutterBottom>
//               Manage Inventory
//             </Typography>
//             <Button sx={{ backgroundColor: "#c17912" }} variant="contained" startIcon={<AddIcon />}>
//               Add Product
//             </Button>
//           </Stack>
//         </Grid>

//         {isLoading ? (
//           <Typography variant="h6" align="center">
//             Loading...
//           </Typography>
//         ) : error ? (
//           <Typography variant="h6" color="error" align="center">
//             {error}
//           </Typography>
//         ) : (
//           <>
//             <Grid item xs={12} container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">Total Products</Typography>
//                     <Typography variant="h4">{products.length}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">In Stock</Typography>
//                     <Typography variant="h4">
//                       {products.filter((p) => computeStatus(p.stock, p.status) === "In Stock").length}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">Low Stock</Typography>
//                     <Typography variant="h4">
//                       {products.filter((p) => computeStatus(p.stock, p.status) === "Low Stock").length}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>

//             <Grid item xs={12}>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Categories</TableCell>
//                       <TableCell>Stock</TableCell>
//                       <TableCell>Price</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {products
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((product, index) => {
//                         const productId = product.id || index;
//                         const computedStatus = computeStatus(product.stock, product.status);
//                         return (
//                           <TableRow key={productId}>
//                             <TableCell>{product.name}</TableCell>
//                             <TableCell>{product.categories || "N/A"}</TableCell>
//                             <TableCell>{product.stock}</TableCell>
//                             <TableCell>
//                               {product.currency} {product.price}
//                             </TableCell>
//                             <TableCell>
//                               <Chip label={computedStatus} color={getStatusColor(computedStatus)} size="small" />
//                             </TableCell>
//                             <TableCell>
//                               <IconButton onClick={() => handleEditOpen(product)}>
//                                 <EditIcon />
//                               </IconButton>
//                               <IconButton onClick={() => handleDeleteClick(product)}>
//                                 <DeleteIcon />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={products.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </Grid>
//           </>
//         )}
//       </Grid>

//       {/* Edit Dialog */}
//       <Dialog open={editDialogOpen} onClose={handleEditClose}>
//         <DialogTitle>Edit Product</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Categories"
//             name="categories"
//             value={editingProduct.categories}
//             onChange={handleEditChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Stock"
//             name="stock"
//             type="number"
//             value={editingProduct.stock}
//             onChange={handleEditChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Price"
//             name="price"
//             type="number"
//             value={editingProduct.price}
//             onChange={handleEditChange}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose}>Cancel</Button>
//           <Button onClick={handleEditSubmit} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancel}>Cancel</Button>
//           <Button onClick={handleDeleteConfirm} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Inventory;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, deleteProduct, updateProduct } from "../store/inventorySlice";
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
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  InputBase,
  styled,
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon 
} from "@mui/icons-material";

// Styled components for the table header
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '1rem',
}));

// Styled input component to remove spinner arrows
const NumberInput = styled(InputBase)(({ theme }) => ({
  '& input': {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },
}));

const Inventory = () => {
  const dispatch = useDispatch();
  const { inventoryItems, isLoading, error } = useSelector((state) => state.inventory);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingRows, setEditingRows] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const sellerId = user.sellerId;
      if (sellerId) {
        dispatch(fetchInventory(sellerId));
      } else {
        console.error("Seller ID is missing in localStorage.");
      }
    }
  }, [dispatch]);

  const products = inventoryItems;

  const computeStatus = (stock, status) => {
    if (status) return status;
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    if (stock > 15) return "In Stock";
    return "Normal Stock";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "success";
      case "Low Stock":
        return "warning";
      case "Out of Stock":
        return "error";
      case "Normal Stock":
        return "default";
      default:
        return "default";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // Cancel any active editing when changing pages
    setEditingRows({});
    setEditedValues({});
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    // Cancel any active editing when changing rows per page
    setEditingRows({});
    setEditedValues({});
  };

  const handleEditClick = (productId) => {
    // Find the product
    const product = products.find(p => p.id === productId);
    
    // Set up editing state for this row
    setEditingRows({
      ...editingRows,
      [productId]: true
    });
    
    // Pre-populate edited values
    setEditedValues({
      ...editedValues,
      [productId]: {
        categories: product.categories || "",
        stock: product.stock,
        price: product.price
      }
    });
  };

  const handleCancelEdit = (productId) => {
    // Remove this product from editing state
    const newEditingRows = { ...editingRows };
    delete newEditingRows[productId];
    setEditingRows(newEditingRows);
    
    // Clear edited values for this product
    const newEditedValues = { ...editedValues };
    delete newEditedValues[productId];
    setEditedValues(newEditedValues);
  };

  const handleFieldChange = (productId, field, value) => {
    setEditedValues({
      ...editedValues,
      [productId]: {
        ...editedValues[productId],
        [field]: field === "stock" || field === "price" ? Number(value) : value
      }
    });
  };

  const handleSaveChanges = (productId) => {
    // Get the updated values
    const updates = editedValues[productId];
    
    // Retrieve sellerId from localStorage
    const userData = localStorage.getItem("user");
    let sellerId = "";
    if (userData) {
      const user = JSON.parse(userData);
      sellerId = user.sellerId;
    }
    
    // Dispatch update action
    dispatch(updateProduct({ 
      id: productId, 
      update: updates, 
      sellerId 
    }));
    
    // Exit editing mode
    handleCancelEdit(productId);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 16, backgroundColor: "background.default" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h4" gutterBottom>
              Manage Inventory
            </Typography>
            <Button sx={{ backgroundColor: "#c17912" }} variant="contained" startIcon={<AddIcon />}>
              Add Product
            </Button>
          </Stack>
        </Grid>

        {isLoading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Products</Typography>
                    <Typography variant="h4">{products.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">In Stock</Typography>
                    <Typography variant="h4">
                      {products.filter((p) => computeStatus(p.stock, p.status) === "In Stock").length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Low Stock</Typography>
                    <Typography variant="h4">
                      {products.filter((p) => computeStatus(p.stock, p.status) === "Low Stock").length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TableContainer sx={{ boxShadow: 3 }}>
                <Table>
                  <StyledTableHead>
                    <TableRow sx={{ bgcolor : "grey"}}>
                      <StyledTableHeadCell>Name</StyledTableHeadCell>
                      <StyledTableHeadCell>Categories</StyledTableHeadCell>
                      <StyledTableHeadCell>Stock</StyledTableHeadCell>
                      <StyledTableHeadCell>Price</StyledTableHeadCell>
                      <StyledTableHeadCell>Status</StyledTableHeadCell>
                      <StyledTableHeadCell align="center">Actions</StyledTableHeadCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {products
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((product, index) => {
                        const productId = product.id || index;
                        const isEditing = editingRows[productId];
                        const computedStatus = computeStatus(product.stock, product.status);
                        
                        return (
                          <TableRow key={productId} hover>
                            <TableCell>{product.name}</TableCell>
                            
                            <TableCell>
                              {isEditing ? (
                                <TextField
                                  size="small"
                                  value={editedValues[productId]?.categories || product.categories || ""}
                                  onChange={(e) => handleFieldChange(productId, "categories", e.target.value)}
                                  variant="outlined"
                                  fullWidth
                                />
                              ) : (
                                product.categories || "N/A"
                              )}
                            </TableCell>
                            
                            <TableCell>
                              {isEditing ? (
                                <NumberInput
                                  type="number"
                                  value={editedValues[productId]?.stock}
                                  onChange={(e) => handleFieldChange(productId, "stock", e.target.value)}
                                  sx={{ width: '80px' }}
                                  inputProps={{
                                    min: 0,
                                    step: 1
                                  }}
                                />
                              ) : (
                                product.stock
                              )}
                            </TableCell>
                            
                            <TableCell>
                              {isEditing ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography sx={{ mr: 1 }}>{product.currency}</Typography>
                                  <NumberInput
                                    type="number"
                                    value={editedValues[productId]?.price}
                                    onChange={(e) => handleFieldChange(productId, "price", e.target.value)}
                                    sx={{ width: '100px' }}
                                    inputProps={{
                                      min: 0,
                                      step: 0.01
                                    }}
                                  />
                                </Box>
                              ) : (
                                `${product.currency} ${product.price}`
                              )}
                            </TableCell>
                            
                            <TableCell>
                              <Chip 
                                label={computedStatus} 
                                color={getStatusColor(computedStatus)} 
                                size="small" 
                              />
                            </TableCell>
                            
                            <TableCell align="center">
                              {isEditing ? (
                                <>
                                  <Tooltip title="Save">
                                    <IconButton 
                                      onClick={() => handleSaveChanges(productId)}
                                      color="grey"
                                      size="small"
                                    >
                                      <SaveIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Cancel">
                                    <IconButton 
                                      onClick={() => handleCancelEdit(productId)}
                                      color="default"
                                      size="small"
                                    >
                                      <CancelIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              ) : (
                                <>
                                  <Tooltip title="Edit">
                                    <IconButton onClick={() => handleEditClick(productId)} size="small">
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton onClick={() => handleDeleteClick(product)} size="small">
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
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
          </>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;