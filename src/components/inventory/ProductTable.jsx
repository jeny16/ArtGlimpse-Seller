import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
    TableCell,
    Paper,
    Box,
    useTheme
} from '@mui/material';
import {
    InboxOutlined as EmptyIcon
} from '@mui/icons-material';

import {
    StyledTableHead,
    StyledTableHeadCell,
    ProductTableRow,
    ProductDetailPanel
} from '../index';

const ProductTable = ({
    products,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    editingProduct,
    editedValues,
    expandedRow,
    getProductStatus,
    handleEditClick,
    handleDeleteClick,
    handleCancelEdit,
    handleFieldChange,
    handleSaveChanges,
    toggleRowExpansion,
    rowHeight
}) => {
    const theme = useTheme();
    // Add state for the selected product and detail panel visibility
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [detailPanelOpen, setDetailPanelOpen] = useState(false);

    // Function to handle row click and open detail panel
    const handleRowClick = (productId) => {
        if (!editingProduct) {  // Don't open panel when in edit mode
            const product = products.find(p => p.id === productId);
            setSelectedProduct(product);
            setDetailPanelOpen(true);
        }
    };

    // Function to close the detail panel
    const handleCloseDetailPanel = () => {
        setDetailPanelOpen(false);
    };

    // Empty state component
    const EmptyState = () => (
        <TableRow>
            <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
                    <EmptyIcon style={{ fontSize: 60, color: theme.palette.text.secondary, marginBottom: 16 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No products found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your search criteria or filters
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableHeadCell width="40%">Product</StyledTableHeadCell>
                                <StyledTableHeadCell width="15%">Category</StyledTableHeadCell>
                                <StyledTableHeadCell width="10%" align="center">Stock</StyledTableHeadCell>
                                <StyledTableHeadCell width="15%" align="center">Price</StyledTableHeadCell>
                                <StyledTableHeadCell width="10%" align="center">Status</StyledTableHeadCell>
                                <StyledTableHeadCell width="10%" align="center">Actions</StyledTableHeadCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {products.length === 0 ? (
                                <EmptyState />
                            ) : (
                                products
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((product) => (
                                        <ProductTableRow
                                            key={product.id}
                                            product={product}
                                            isEditing={editingProduct === product.id}
                                            isExpanded={expandedRow === product.id}
                                            editedValues={editedValues}
                                            getProductStatus={getProductStatus}
                                            toggleRowExpansion={toggleRowExpansion}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                            handleCancelEdit={handleCancelEdit}
                                            handleFieldChange={handleFieldChange}
                                            handleSaveChanges={handleSaveChanges}
                                            rowHeight={rowHeight}
                                            // Add the new onClick handler to open detail panel
                                            onRowClick={handleRowClick}
                                        />
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={products.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    labelRowsPerPage="Products per page:"
                />
            </Paper>

            {/* Add the ProductDetailPanel component */}
            <ProductDetailPanel
                product={selectedProduct}
                open={detailPanelOpen}
                onClose={handleCloseDetailPanel}
            />
        </>
    );
};

export default ProductTable;