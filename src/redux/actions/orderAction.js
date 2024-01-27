import { server } from '../store';
import axios from 'axios';

//get all order
export const getAllOrders = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allOrderRequest' });
    const { data } = await axios.get(`${server}/admin/orders`, config);

    // Destructure the data object to get the required properties
    const { orders, ordersCount } = data;

    // Dispatch the relevant data to the Redux store
    dispatch({
      type: 'allOrderSuccess',
      payload: {
        orders,
        ordersCount,
      },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allOrderFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allOrderFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};

//get a order
export const getOrderDetails = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'orderDetailsRequest' });

    const { data } = await axios.get(`${server}/order/${id}`, config);

    const {order,userdetails}= data;

    dispatch({
      type: 'orderDetailsSuccess',
      payload: {
        order,
        userdetails,
      },
    });
  } catch (error) {
    dispatch({
      type: 'orderDetailsFail',
      payload: error.response.data.message,
    });
  }
};

//update order
export const updateOrder = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: 'UpdatOrderDetailsRequest' });
    const { data } = await axios.put(
      `${server}/admin/order/${id}`,
      formData,
      config
    );
    
    dispatch({ type: 'UpdatOrderDetailsSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'UpdateOrderDetailsFail',
      payload: error.response.data.message,
    });
  }
};