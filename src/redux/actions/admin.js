import { server } from '../store';
import axios from 'axios';

//create product
export const createProduct = formData => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
  };

  try {
    dispatch({ type: 'createProductRequest' });

    const { data } = await axios.post(
      `${server}/createproduct`,
      formData,
      config
    );
    dispatch({ type: 'createProductSuccess', payload: data.message });
  } catch (error) {
    console.error('Error creating product:', error.response.data.message);
    dispatch({
      type: 'createProductFail',
      payload: error.response.data.message,
    });
  }
};

//get product
export const getAllProducts = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allProductRequest' });
    const { data } = await axios.get(`${server}/products`, config);

    // Destructure the data object to get the required properties
    const { products, productsCount, resultPerPage, filteredProductsCount } =
      data;

    // Dispatch the relevant data to the Redux store
    dispatch({
      type: 'allProductSuccess',
      payload: {
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allProductFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allProductFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};

//delete product
export const deleteProduct = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'deleteProductRequest' });

    const { data } = await axios.delete(`${server}/product/${id}`, config);
    dispatch({ type: 'deleteProductSuccess', payload: data.message });
  } catch (error) {
    console.error('Error deleting Product:', error.response.data.message);
    dispatch({
      type: 'deletProductFail',
      payload: error.response.data.message,
    });
  }
};

//get product details
export const getProductDetails = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'productDetailsRequest' });

    const { data } = await axios.get(`${server}/product/${id}`, config);

    dispatch({
      type: 'productDetailsSuccess',
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: 'productDetailsFail',
      payload: error.response.data.message,
    });
  }
};

//update product
export const updateProduct = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: 'UpdateProductDetailsRequest' });
    const { data } = await axios.put(
      `${server}/product/${id}`,
      formData,
      config
    );
    dispatch({ type: 'UpdateProductDetailsSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'UpdateProductDetailsFail',
      payload: error.response.data.message,
    });
  }
};

//getDashboardData
export const getAllDashboard = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allDashboardRequest' });
    const { data } = await axios.get(`${server}/admin/dashboard`, config);

    // Destructure the data object to get the required properties
    const {
      userCount,
      productsCount,
      TotalOrders,
      ordersPlaced,
      orderShipped,
      orderDelivered,
      orderCancelled,
      totalOrdersAmount,
      totalOrdersAmountCancelled,
    } = data;

    // Dispatch the relevant data to the Redux store
    dispatch({
      type: 'allDashboardSuccess',
      payload: {
        userCount,
        productsCount,
        TotalOrders,
        ordersPlaced,
        orderShipped,
        orderDelivered,
        orderCancelled,
        totalOrdersAmount,
        totalOrdersAmountCancelled,
      },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allDashboardFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allDoctorFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};

//get product
export const getAllUsers = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allUserRequest' });
    const { data } = await axios.get(`${server}/admin/users`, config);

    const { users, userCount } = data;
    dispatch({
      type: 'allUserSuccess',
      payload: { users, userCount },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allUserFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allUserFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};
