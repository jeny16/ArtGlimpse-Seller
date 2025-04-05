import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./style/Theme";
import { CssBaseline } from "@mui/material";
import AddProduct from "./Pages/AddProduct";
import Analytics from "./Pages/AnalyticsPage";
import Inventory from "./Pages/Inventory";
import OrderManagement from "./Pages/Orders";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import store from "./store/store";
import { Provider, useSelector } from "react-redux";
import AuthLayout from "./components/common/AuthLayout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import SellerProfile from "./Pages/Profile";
import HomeDashBoard from "./Pages/HomeDashBoard";
import HomePage from "./Pages/HomePage";
import React from "react";

// 🔁 Redirect based on login status
const RedirectRoot = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <Navigate to={isLoggedIn ? "/dashboard" : "/home"} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RedirectRoot />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <HomeDashBoard />
          </AuthLayout>
        ),
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication={false}>
            <HomePage />
          </AuthLayout>
        ),
      },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/orders", element: <OrderManagement /> },
      { path: "/orders/:orderId", element: <OrderDetailsPage /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <SellerProfile />
          </AuthLayout>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
