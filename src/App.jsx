import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './Pages/HomePage'; 
import { ThemeProvider } from '@emotion/react';
import theme from './style/Theme';
import { CssBaseline } from '@mui/material';
import AddProduct from './Pages/AddProduct';
import Analytics from './Pages/AnalyticsPage';
import Inventory from './Pages/Inventory';
import OrderManagement from './Pages/Orders';
import store from './store/store';
import { Provider } from 'react-redux';
import AuthLayout from './components/common/AuthLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import SellerProfile from './Pages/Profile';


// Define routes outside of the App component
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-product",
        element: <AddProduct />
      },
      {
        path: "/analytics",
        element: <Analytics />
      },
      {
        path: "/inventory",
        element: <Inventory />
      },
      {
        path: "/orders",
        element: <OrderManagement />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: <SellerProfile />
      },
      // Add more routes as needed
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
