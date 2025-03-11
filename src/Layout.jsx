import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateToken = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        try {
          await axios.get('http://localhost:8081/api/auth/validate', {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          dispatch(logout());
          localStorage.removeItem('user');
          console.error("Token validation failed, user has been logged out.", error);
        }
      }
    };

    validateToken();
  }, [dispatch]);
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
