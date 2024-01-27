// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Admin/Dashboard/Dashboard';
import Login from './component/Admin/Login/Login.jsx';
import Home from "./component/Home/Home.jsx";
import toast, { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from 'protected-route-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction.js';
import CreateProduct from './component/Admin/CreateProduct/CreateProduct.jsx';
import Products from './component/Admin/Products/Products.jsx';
import UpdateProduct from './component/Admin/Products/UpdateProduct.jsx';
import Users from './component/Admin/Users/Users.jsx';
import Orders from './component/Admin/Orders/Orders.jsx';
import UpdateOrder from './component/Admin/Orders/UpdateOrder.jsx';
import Coupon from './component/Admin/Coupon/Coupon.jsx';
import CreateCoupon from './component/Admin/Coupon/CreateCoupon.jsx';




function App() {
  const { isAuthenticated, message, error } = useSelector(state => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/dashboard"
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createproduct"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coupons"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Coupon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createcoupons"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreateCoupon />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
