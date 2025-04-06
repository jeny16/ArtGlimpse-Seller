import React from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Grid,
    Chip,
    Divider,
    IconButton,
    Stack,
    Paper,
    useTheme,
    Avatar,
    Badge,
    Tooltip,
    Rating,
    Card,
    CardContent,
    Tabs,
    Tab,
    useMediaQuery
} from '@mui/material';
import {
    Close as CloseIcon,
    LocalShipping as ShippingIcon,
    AccessTime as TimeIcon,
    Language as LanguageIcon,
    Category as CategoryIcon,
    Tag as TagIcon,
    AttachMoney as MoneyIcon,
    Store as StoreIcon,
    PhoneAndroid as PhoneIcon,
    Email as EmailIcon,
    Inventory as InventoryIcon,
    Info as InfoIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Description as DescriptionIcon,
    LocalOffer as OfferIcon,
    VerifiedUser as VerifiedIcon
} from '@mui/icons-material';
import { formatCurrency, formatDate, daysUntil } from '../index';

const DetailItem = ({ icon, label, value }) => {
    const theme = useTheme();
    return (
        <Box sx={{ my: 1.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{
                    width: 32,
                    height: 32,
                    bgcolor: theme.palette.custom.highlight + '15',
                    color: theme.palette.custom.highlight
                }}>
                    {icon}
                </Avatar>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="500">
                    {label}
                </Typography>
            </Stack>
            <Typography variant="body1" sx={{ ml: 6, mt: 0.5 }}>
                {value}
            </Typography>
        </Box>
    );
};

const ChipList = ({ items, icon }) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, my: 1 }}>
            {items.map((item, index) => (
                <Chip
                    key={index}
                    icon={icon}
                    label={item}
                    size="small"
                    sx={{
                        borderColor: theme.palette.custom.highlight + '40',
                        color: theme.palette.text.primary,
                        bgcolor: theme.palette.background.default,
                        '&:hover': {
                            backgroundColor: theme.palette.custom.highlight + '10',
                        }
                    }}
                    variant="outlined"
                />
            ))}
        </Box>
    );
};

const SectionTitle = ({ title, icon }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5, mt: 2 }}>
            <Avatar sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.custom.highlight + '20',
                color: theme.palette.custom.highlight
            }}>
                {icon}
            </Avatar>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                }}
            >
                {title}
            </Typography>
        </Stack>
    );
};

const ProductDetailPanel = ({ product, onClose, open }) => {
    const theme = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [tabValue, setTabValue] = React.useState(0);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    if (!product) return null;

    // Calculate original price from discounted price and discount percentage
    const originalPrice = product.discount
        ? Math.round(product.price / (1 - product.percentage_Discount / 100))
        : product.price;

    // Calculate savings
    const savings = product.discount
        ? originalPrice - product.price
        : 0;

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            // maxHeight="90%"
            fullScreen={fullScreen}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minHeight: '90vh',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    overflow: 'hidden'
                }
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    bgcolor: theme.palette.custom.highlight + '08',
                    borderBottom: `1px solid ${theme.palette.custom.highlight}20`,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        color: theme.palette.text.primary
                    }}
                >
                    <InfoIcon sx={{ color: theme.palette.custom.highlight }} />
                    Product Details
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Grid container>
                    {/* Left side: Product image */}
                    <Grid item xs={12} md={5} sx={{ bgcolor: theme.palette.grey[50] }}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: { xs: '300px', md: '100%' },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 2
                            }}
                        >
                            {product.images && product.images.length > 0 && (
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    style={{
                                        maxHeight: '90%',
                                        maxWidth: '90%',
                                        objectFit: 'contain',
                                    }}
                                />
                            )}

                            {product.discount && (
                                <Badge
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        backgroundColor: theme.palette.error.main,
                                        color: 'white',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {product.percentage_Discount}% OFF
                                </Badge>
                            )}

                            {product.images && product.images.length > 1 && (
                                <>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            left: 8,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(255,255,255,0.7)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                            }
                                        }}
                                        onClick={handlePrevImage}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(255,255,255,0.7)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                            }
                                        }}
                                        onClick={handleNextImage}
                                    >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>

                        {/* Thumbnail images */}
                        {product.images && product.images.length > 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    p: 2,
                                    justifyContent: 'center',
                                    bgcolor: theme.palette.grey[100]
                                }}
                            >
                                {product.images.map((img, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: index === currentImageIndex
                                                ? `2px solid ${theme.palette.custom.highlight}`
                                                : '2px solid transparent',
                                            opacity: index === currentImageIndex ? 1 : 0.7,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                opacity: 1
                                            }
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} - ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Grid>

                    {/* Right side: Product details */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
                            {/* Product name and category */}
                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="h5"
                                    fontWeight="600"
                                    sx={{ mb: 1 }}
                                >
                                    {product.name}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                                    <Chip
                                        icon={<CategoryIcon sx={{ fontSize: '1rem' }} />}
                                        label={product.categories || "Uncategorized"}
                                        size="small"
                                        sx={{
                                            bgcolor: theme.palette.custom.highlight + '10',
                                            color: theme.palette.custom.highlight,
                                            borderColor: theme.palette.custom.highlight + '30',
                                            fontWeight: 500,
                                        }}
                                        variant="outlined"
                                    />

                                    <Chip
                                        icon={<InventoryIcon sx={{ fontSize: '1rem' }} />}
                                        label={product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                        size="small"
                                        color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "error"}
                                        sx={{ fontWeight: 500 }}
                                    />
                                </Box>
                            </Box>

                            {/* Price section */}
                            <Card
                                variant="outlined"
                                sx={{
                                    mb: 3,
                                    borderColor: theme.palette.custom.highlight + '30',
                                    borderRadius: 2
                                }}
                            >
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                                        <Typography
                                            variant="h4"
                                            fontWeight="bold"
                                            color={theme.palette.custom.highlight}
                                        >
                                            {formatCurrency(product.price, product.currency)}
                                        </Typography>

                                        {product.discount && (
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ textDecoration: 'line-through' }}
                                            >
                                                {formatCurrency(originalPrice, product.currency)}
                                            </Typography>
                                        )}
                                    </Box>

                                    {product.discount && (
                                        <Box
                                            sx={{
                                                mt: 1.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Chip
                                                size="small"
                                                icon={<OfferIcon sx={{ fontSize: '1rem' }} />}
                                                label={`Save ${formatCurrency(savings, product.currency)}`}
                                                sx={{
                                                    bgcolor: theme.palette.error.main + '15',
                                                    color: theme.palette.error.main,
                                                    fontWeight: 'bold',
                                                    borderColor: theme.palette.error.main + '30'
                                                }}
                                                variant="outlined"
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                <Tooltip title={formatDate(product.valid_Until_Discount)}>
                                                    <span>
                                                        Offer ends in {daysUntil(product.valid_Until_Discount)} days
                                                    </span>
                                                </Tooltip>
                                            </Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Tabs for details */}
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    aria-label="product details tabs"
                                    textColor="inherit"
                                    sx={{
                                        '.Mui-selected': {
                                            color: `${theme.palette.custom.highlight} !important`,
                                        },
                                        '.MuiTabs-indicator': {
                                            backgroundColor: theme.palette.custom.highlight,
                                        }
                                    }}
                                >
                                    <Tab
                                        icon={<DescriptionIcon fontSize="small" />}
                                        iconPosition="start"
                                        label="Description"
                                        sx={{ textTransform: 'none' }}
                                    />
                                    <Tab
                                        icon={<ShippingIcon fontSize="small" />}
                                        iconPosition="start"
                                        label="Shipping"
                                        sx={{ textTransform: 'none' }}
                                    />
                                    <Tab
                                        icon={<StoreIcon fontSize="small" />}
                                        iconPosition="start"
                                        label="Seller"
                                        sx={{ textTransform: 'none' }}
                                    />
                                </Tabs>
                            </Box>

                            {/* Tab Panels */}
                            <TabPanel value={tabValue} index={0}>
                                {/* Description */}
                                <Typography variant="body1" paragraph>
                                    {product.description}
                                </Typography>

                                {/* Materials */}
                                <SectionTitle title="Materials" icon={<CategoryIcon />} />
                                <ChipList items={product.materials_Made || []} icon={<CategoryIcon sx={{ fontSize: '1rem' }} />} />

                                {/* Tags */}
                                <SectionTitle title="Product Tags" icon={<TagIcon />} />
                                <ChipList items={product.tags || []} icon={<TagIcon sx={{ fontSize: '1rem' }} />} />
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                {/* Shipping Details */}
                                <Box sx={{ mb: 2 }}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            bgcolor: theme.palette.grey[50],
                                            borderRadius: 2,
                                            borderColor: theme.palette.grey[200]
                                        }}
                                    >
                                        <CardContent>
                                            <DetailItem
                                                icon={<TimeIcon fontSize="small" />}
                                                label="Processing Time"
                                                value={product.processing_Time}
                                            />

                                            <DetailItem
                                                icon={<ShippingIcon fontSize="small" />}
                                                label="Shipping Time"
                                                value={product.shipping_Time}
                                            />

                                            <DetailItem
                                                icon={<MoneyIcon fontSize="small" />}
                                                label="Shipping Cost"
                                                value={formatCurrency(product.shipping_Cost, product.currency)}
                                            />

                                            <DetailItem
                                                icon={<TimeIcon fontSize="small" />}
                                                label="Estimated Delivery"
                                                value={formatDate(product.estimated_Delivery)}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>

                                {/* Available Countries */}
                                <SectionTitle title="Available For Shipping To" icon={<LanguageIcon />} />
                                <ChipList items={product.countries_Available || []} icon={<LanguageIcon sx={{ fontSize: '1rem' }} />} />
                            </TabPanel>

                            <TabPanel value={tabValue} index={2}>
                                {/* Seller Details */}
                                <Box sx={{ mb: 2 }}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            bgcolor: theme.palette.grey[50],
                                            borderRadius: 2,
                                            borderColor: theme.palette.grey[200]
                                        }}
                                    >
                                        <CardContent>
                                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: theme.palette.custom.highlight + '20',
                                                        color: theme.palette.custom.highlight,
                                                        width: 56,
                                                        height: 56
                                                    }}
                                                >
                                                    {product.seller?.sellerProfile?.name?.charAt(0) || 'S'}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold">
                                                        {product.seller?.sellerProfile?.storeName || "Store"}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.seller?.sellerProfile?.name || "Seller"}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    size="small"
                                                    icon={<VerifiedIcon sx={{ fontSize: '1rem' }} />}
                                                    label="Verified Seller"
                                                    sx={{
                                                        bgcolor: 'success.main' + '15',
                                                        color: 'success.main',
                                                        fontWeight: 'medium',
                                                        ml: 'auto'
                                                    }}
                                                />
                                            </Stack>

                                            <Divider sx={{ my: 2 }} />

                                            <DetailItem
                                                icon={<EmailIcon fontSize="small" />}
                                                label="Email"
                                                value={product.seller?.sellerProfile?.email || "N/A"}
                                            />

                                            <DetailItem
                                                icon={<PhoneIcon fontSize="small" />}
                                                label="Contact"
                                                value={product.seller?.sellerProfile?.contactNumber || "N/A"}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            </TabPanel>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

// TabPanel component for the tabs
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            {...other}
            style={{ paddingBottom: '16px' }}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default ProductDetailPanel;