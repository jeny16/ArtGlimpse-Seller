import React, { memo, useState } from 'react';
import { Search, Menu as MenuIcon, X as CloseIcon, Heart, ShoppingCart, User, LogOut, FileText } from 'lucide-react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import authService from "../action/authService";
import { logout } from "../store/authSlice";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.neutral.light,
  boxShadow: 'none',
  borderBottom: '1px solid #dbd4c7',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral.main,
  fontWeight: 500,
  textTransform: 'none',
  width: '100%',
  justifyContent: 'flex-start',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
  },
  '&.MuiButtonBase-root': {
    disableRipple: true,
  },
}));

const IconWrapper = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.highlight,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.custom.accent,
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get isLoggedIn from Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  const renderAuthButtons = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      <Link to="/login">
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.custom.highlight,
            borderColor: theme.palette.custom.highlight,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: theme.palette.custom.accent,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.custom.highlight,
            textTransform: 'none',
            fontWeight: 500,
            color: '#fff',
            '&:hover': { backgroundColor: theme.palette.custom.accent },
          }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );

  const renderUserIcons = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
      <IconWrapper onClick={() => navigate("/profile")}>
        <User size={24} />
      </IconWrapper>
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{ display: { xs: 'flex', md: 'none' } }}
    >
      <Box
        width="250px"
        role="presentation"
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
       
      </Box>
    </Drawer>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Container>
          <Box display="flex" alignItems="center" py={3} px={1} justifyContent="space-between">
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: 'serif',
                  color: theme.palette.custom.highlight,
                  fontWeight: 'bold'
                }}
              >
                ArtGlimpse-Seller
              </Typography>
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Box position="relative">
                <TextField
                  size="small"
                  placeholder="Search for products, categories..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <Search
                        size={20}
                        style={{ marginRight: 8, color: theme.palette.secondary.main }}
                      />
                    ),
                    sx: { paddingInline: '10px', fontSize: '14px' },
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50px',
                    border: '1px solid #dbd4c7',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                      '&.Mui-focused fieldset': { borderColor: theme.palette.custom.highlight },
                    },
                    '& input::placeholder': {
                      color: theme.palette.secondary.main,
                      fontStyle: 'italic',
                    },
                  }}
                />
              </Box>
              {isLoggedIn ? renderUserIcons() : renderAuthButtons()}
            </Box>
            <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Container>
      </StyledAppBar>

      {renderMobileMenu()}
    </>
  );
};

export default memo(Header);
