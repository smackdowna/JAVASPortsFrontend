import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './reducers/userReducer';
import {  ProductReducer, deleteProductReducer, getDashboardReducer, getProductReducer, getUserReducer, productDeatilsReducer, updateProductReducer } from './reducers/productReducer';
import { getOrderReducer, orderDeatilsReducer, updateOrderReducer } from './reducers/orderReducer';
import { createCouponReducer, deleteCouponReducer, getCouponReducer } from './reducers/couponReducer';

export const server = 'https://javabc.vercel.app/api/v1';
//http://localhost:7000/api/v1
//'https://javabc.vercel.app/api/v1'


const store = configureStore({
  reducer: {
    //product
    product:ProductReducer,
    products:getProductReducer,
    deleteProduct:deleteProductReducer,
    productt:productDeatilsReducer,
    update:updateProductReducer,
    dashboard:getDashboardReducer,
    //user
    users:getUserReducer,
    login:loginReducer,
    //order
    orders:getOrderReducer,
    order:orderDeatilsReducer,
    updateOrder:updateOrderReducer,
    //coupon
    coupon:createCouponReducer,
    coupons:getCouponReducer,
    deleteCoupon:deleteCouponReducer,
  }
});

export default store;
