import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const QuickActionCard = ({ icon: Icon, title, description, onClick }) => (
  <Card 
    variant="outlined"
    sx={{ 
      height: "100%", 
      display: "flex", 
      flexDirection: "column",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: 3,
        borderColor: "primary.main"
      }
    }}
  >
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon size={24} color="#1976d2" />
        <Typography 
          variant="h6" 
          sx={{ 
            ml: 2, 
            fontWeight: 600, 
            fontSize: "1rem",
            flexGrow: 1
          }}
        >
          {title}
        </Typography>
        <Box 
          sx={{ 
            bgcolor: "primary.lighter", 
            p: 0.5, 
            borderRadius: 1,
            display: "flex",
            alignItems: "center"
          }}
        >
          <ChevronDown size={16} color="#1976d2" />
        </Box>
      </Box>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          flexGrow: 1,
          mb: 2
        }}
      >
        {description}
      </Typography>
      <Button 
        variant="contained" 
        fullWidth 
        onClick={onClick}
        startIcon={<ArrowUpRight size={20} />}
        sx={{ 
          textTransform: "none",
          backgroundColor: "custom.highlight",
          color: "primary.contrastText",
          "&:hover": { 
            backgroundColor: "custom.accent" 
          },
          mt: "auto"
        }}
      >
        Proceed to {title}
      </Button>
    </CardContent>
  </Card>
);

export default QuickActionCard;