import { server } from '../store';
import axios from 'axios';

//create coupon
export const createCoupon = formData => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
  };

  try {
    dispatch({ type: 'createCouponRequest' });

    const { data } = await axios.post(`${server}/coupon/new`, formData, config);
    dispatch({ type: 'createCouponSuccess', payload: data.message });
  } catch (error) {
    console.error('Error creating Coupon:', error.response.data.message);
    dispatch({
      type: 'createCouponFail',
      payload: error.response.data.message,
    });
  }
};

//get all coupon
export const getAllCoupon = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allCouponRequest' });
    const { data } = await axios.get(`${server}/coupon/all`, config);

    const { coupons, couponCount } = data;

    // Dispatch the relevant data to the Redux store
    dispatch({
      type: 'allCouponSuccess',
      payload: { coupons, couponCount },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allCouponFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allCouponFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};

//delete coupon
export const deleteCoupon = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'deleteCouponRequest' });

    const { data } = await axios.delete(`${server}/coupon/${id}`, config);
    dispatch({ type: 'deleteCouponSuccess', payload: data.message });
  } catch (error) {
    console.error('Error Deleting Coupon:', error.response.data.message);
    dispatch({
      type: 'deletCouponFail',
      payload: error.response.data.message,
    });
  }
};
