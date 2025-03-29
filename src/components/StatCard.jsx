import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress, useTheme } from "@mui/material";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, change, color, subtext }) => {
  // Use the theme to get the actual color value
  const theme = useTheme();
  
  // Parse the color string to get the actual color from theme
  const getThemeColor = (colorPath) => {
    const parts = colorPath.split('.');
    let result = theme.palette;
    
    // Navigate through the theme object based on the path
    for (const part of parts) {
      if (result[part]) {
        result = result[part];
      } else {
        return colorPath; // Return original if not found
      }
    }
    
    return typeof result === 'string' ? result : colorPath;
  };

  const iconColor = getThemeColor(color);
  const isPositive = change >= 0;

  return (
    <Card 
      variant="outlined"
      sx={{ 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 3,
          borderColor: "secondary.main",
        },
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", pb: 1 }}>
        <Box 
          sx={{ 
            backgroundColor: `${getThemeColor(color)}15`, // Using opacity for lighter version
            p: 1.5, 
            borderRadius: 2, 
            mr: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color={iconColor} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
          {subtext && (
            <Typography variant="caption" color="text.secondary">
              {subtext}
            </Typography>
          )}
        </Box>
      </CardContent>
      <Box sx={{ px: 2, pb: 2, mt: "auto" }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, Math.abs(change) * 5)} // Scale the change for better visual (capped at 100%)
          color={isPositive ? "success" : "error"}
          sx={{ 
            height: 4, 
            borderRadius: 2,
            backgroundColor: "grey.200",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          {isPositive ? (
            <ArrowUpRight 
              size={16}
              color={getThemeColor("success.main")}
              style={{ marginRight: 4 }}
            />
          ) : (
            <ArrowDownRight 
              size={16}
              color={getThemeColor("error.main")}
              style={{ marginRight: 4 }}
            />
          )}
          <Typography 
            variant="caption" 
            color={isPositive ? "success.main" : "error.main"}
          >
            {isPositive ? "+" : ""}{change}% from last week
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;