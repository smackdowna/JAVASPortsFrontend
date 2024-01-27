import { createReducer } from '@reduxjs/toolkit';

const allOrderRequest = 'allOrderRequest';
const allOrderSuccess = 'allOrderSuccess';
const allOrderFail = 'allOrderFail';

const orderDetailsRequest = 'orderDetailsRequest';
const orderDetailsSuccess = 'orderDetailsSuccess';
const orderDetailsFail = 'orderDetailsFail';


const UpdateOrderDetailsRequest = 'UpdateOrderDetailsRequest';
const UpdateOrderDetailsSuccess = 'UpdateOrderDetailsSuccess';
const UpdateOrderDetailsFail = 'UpdateOrderDetailsFail';

const clearError = 'clearError';
const clearMessage = 'clearMessage';

//get order
export const getOrderReducer = createReducer({}, builder => {
  builder
    .addCase(allOrderRequest, state => {
      state.loading = true;
    })
    .addCase(allOrderSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(allOrderFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});

////get  order details
export const orderDeatilsReducer = createReducer({order:[]}, builder => {
  builder
    .addCase(orderDetailsRequest, state => {
      state.loading = true;
    })
    .addCase(orderDetailsSuccess, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase(orderDetailsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});


//update order
export const updateOrderReducer = createReducer({}, builder => {
  builder
    .addCase(UpdateOrderDetailsRequest, state => {
      state.loading = true;
    })
    .addCase(UpdateOrderDetailsSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(UpdateOrderDetailsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});