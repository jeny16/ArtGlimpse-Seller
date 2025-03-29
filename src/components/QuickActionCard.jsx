import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const QuickActionCard = ({ icon: Icon, title, description, onClick }) => (
  <Card 
    variant="outlined"
    sx={{ 
      width: "100%",
      height: "100%", 
      display: "flex", 
      flexDirection: "column",
      borderRadius: 2,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      transition: "all 0.2s ease",
      "&:hover": {
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        borderColor: "primary.main"
      }
    }}
  >
    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
      {/* Header with icon and dropdown */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ color: "primary.highllight" }}>
          <Icon size={24} />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            ml: 1.5, 
            fontWeight: 500, 
            fontSize: "1rem",
            flexGrow: 1
          }}
        >
          {title}
        </Typography>
        <ChevronDown size={16} color="#666" />
      </Box>
      
      {/* Description */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mb: 2 }}
      >
        {description}
      </Typography>
      
      {/* Button */}
      <Button 
        variant="contained" 
        fullWidth 
        onClick={onClick}
        startIcon={<ArrowUpRight size={16} />}
        sx={{ 
          textTransform: "none",
          backgroundColor: "#D28C14", // Gold/amber color from the screenshot
          color: "white",
          borderRadius: 1,
          py: 1,
          "&:hover": { 
            backgroundColor: "#BD7B06" 
          }
        }}
      >
        Proceed to {title}
      </Button>
    </CardContent>
  </Card>
);

export default QuickActionCard;