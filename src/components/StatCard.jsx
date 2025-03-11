import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
import { ArrowUpRight } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, change, color, subtext }) => {
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
            backgroundColor: `${color}.lighter`, 
            p: 1.5, 
            borderRadius: 2, 
            mr: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color={color} />
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
          value={Math.abs(change)}
          color={change > 0 ? "success" : "error"}
          sx={{ 
            height: 4, 
            borderRadius: 2,
            backgroundColor: "grey.200",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <ArrowUpRight 
            size={16} 
            color={change > 0 ? "green" : "red"}
            style={{ marginRight: 4 }}
          />
          <Typography 
            variant="caption" 
            color={change > 0 ? "success.main" : "error.main"}
          >
            {change > 0 ? "+" : ""}{change}% from last week
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;