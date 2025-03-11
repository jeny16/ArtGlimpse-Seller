import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Divider,
  Button
} from '@mui/material';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

const ProductPerformance = () => {
  // Sample data - in a real application this would come from props or an API
  const products = [
    { 
      id: 1, 
      name: 'Organic Cotton T-Shirt', 
      sales: 42, 
      revenue: 2100, 
      trend: 'up', 
      performance: 80, 
      image: '/api/placeholder/40/40' 
    },
    { 
      id: 2, 
      name: 'Handcrafted Wooden Bowl', 
      sales: 35, 
      revenue: 1750, 
      trend: 'up', 
      performance: 75, 
      image: '/api/placeholder/40/40' 
    },
    { 
      id: 3, 
      name: 'Natural Soap Bar', 
      sales: 28, 
      revenue: 840, 
      trend: 'down', 
      performance: 62, 
      image: '/api/placeholder/40/40' 
    },
    { 
      id: 4, 
      name: 'Eco-Friendly Water Bottle', 
      sales: 21, 
      revenue: 630, 
      trend: 'up', 
      performance: 55, 
      image: '/api/placeholder/40/40' 
    },
    { 
      id: 5, 
      name: 'Bamboo Toothbrush Set', 
      sales: 18, 
      revenue: 540, 
      trend: 'down', 
      performance: 48, 
      image: '/api/placeholder/40/40' 
    },
    { 
      id: 6, 
      name: 'Reusable Produce Bags', 
      sales: 15, 
      revenue: 375, 
      trend: 'up', 
      performance: 42, 
      image: '/api/placeholder/40/40' 
    },
  ];

  return (
    <Card sx={{ height: '100%', boxShadow: 2, display: 'flex', flexDirection: 'column' }}>
      <CardHeader 
        title="Top Performing Products" 
        subheader="Based on sales and revenue"
        sx={{ pb: 1 }}
      />
      <Divider />
      <CardContent sx={{ pt: 1, pb: 0, flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ width: '100%' }}>
          {products.map((product) => (
            <ListItem 
              key={product.id}
              alignItems="flex-start"
              sx={{ 
                px: 0, 
                py: 1.5,
                borderBottom: '1px solid', 
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  alt={product.name} 
                  src={product.image}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight={600}>
                    {product.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Typography 
                        component="span" 
                        variant="body2" 
                        color="text.primary"
                        fontWeight={500}
                        sx={{ mr: 2 }}
                      >
                        ₹{product.revenue.toLocaleString()}
                      </Typography>
                      <Typography 
                        component="span" 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        {product.sales} sold
                      </Typography>
                      {product.trend === 'up' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                          <TrendingUp size={16} />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            12%
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                          <TrendingDown size={16} />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            8%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={product.performance} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 1,
                            backgroundColor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 
                                product.performance > 70 ? 'success.main' : 
                                product.performance > 50 ? 'warning.main' : 'error.main'
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {product.performance}%
                      </Typography>
                    </Box>
                  </React.Fragment>
                }
                secondaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<Eye size={16} />}
          sx={{ mt: 1 }}
        >
          View All Products
        </Button>
      </Box>
    </Card>
  );
};

export default ProductPerformance;
