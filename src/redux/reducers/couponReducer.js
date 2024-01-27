import { createReducer } from '@reduxjs/toolkit';

const createCouponRequest = 'createCouponRequest';
const createCouponSuccess = 'createCouponSuccess';
const createCouponFail = 'createCouponFail';

const allCouponRequest = 'allCouponRequest';
const allCouponSuccess = 'allCouponSuccess';
const allCouponFail = 'allCouponFail';

const deleteCouponRequest = 'deleteCouponRequest';
const deleteCouponSuccess = 'deleteCouponSuccess';
const deleteCouponFail = 'deleteCouponFail';

const clearError = 'clearError';
const clearMessage = 'clearMessage';

//create coupon
export const createCouponReducer = createReducer({}, builder => {
  builder
    .addCase(createCouponRequest, state => {
      state.loading = true;
    })
    .addCase(createCouponSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createCouponFail, (state, action) => {
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


export const getCouponReducer = createReducer({ coupons: [] }, builder => {
  builder
    .addCase(allCouponRequest, state => {
      state.loading = true;
    })
    .addCase(allCouponSuccess, (state, action) => {
      state.loading = false;
      state.coupons = action.payload;
    })
    .addCase(allCouponFail, (state, action) => {
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

//delete Coupon
export const deleteCouponReducer = createReducer({}, builder => {
  builder
    .addCase(deleteCouponRequest, state => {
      state.loading = true;
    })
    .addCase(deleteCouponSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteCouponFail, (state, action) => {
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
