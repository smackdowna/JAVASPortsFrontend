import { createReducer } from '@reduxjs/toolkit';

const createProductRequest = 'createProductRequest';
const createProductSuccess = 'createProductSuccess';
const createProductFail = 'createProductFail';

const allProductRequest = 'allProductRequest';
const allProductSuccess = 'allProductSuccess';
const allProductFail = 'allProductFail';

const deleteProductRequest = 'deleteProductRequest';
const deleteProductSuccess = 'deleteProductSuccess';
const deleteProductFail = 'deleteProductFail';

const productDetailsRequest = 'productDetailsRequest';
const productDetailsSuccess = 'productDetailsSuccess';
const productDetailsFail = 'productDetailsFail';

const UpdateProductDetailsRequest = 'UpdateProductDetailsRequest';
const UpdateProductDetailsSuccess = 'UpdateProductDetailsSuccess';
const UpdateProductDetailsFail = 'UpdateProductDetailsFail';


const allDashboardRequest = 'allDashboardRequest';
const allDashboardSuccess = 'allDashboardSuccess';
const allDashboardFail = 'allDashboardFail';


const allUserRequest = 'allUserRequest';
const allUserSuccess = 'allUserSuccess';
const allUserFail = 'allUserFail';



const clearError = 'clearError';
const clearMessage = 'clearMessage';

//create product
export const ProductReducer = createReducer({}, builder => {
  builder
    .addCase(createProductRequest, state => {
      state.loading = true;
    })
    .addCase(createProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createProductFail, (state, action) => {
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

//get product
export const getProductReducer = createReducer({ products: [] }, builder => {
  builder
    .addCase(allProductRequest, state => {
      state.loading = true;
    })
    .addCase(allProductSuccess, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(allProductFail, (state, action) => {
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

//delete product
export const deleteProductReducer = createReducer({}, builder => {
  builder
    .addCase(deleteProductRequest, state => {
      state.loading = true;
    })
    .addCase(deleteProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteProductFail, (state, action) => {
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

//get productdetails
export const productDeatilsReducer = createReducer({ product: [] }, builder => {
  builder
    .addCase(productDetailsRequest, state => {
      state.loading = true;
    })
    .addCase(productDetailsSuccess, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    })
    .addCase(productDetailsFail, (state, action) => {
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

//update Product
export const updateProductReducer = createReducer({}, builder => {
  builder
    .addCase(UpdateProductDetailsRequest, state => {
      state.loading = true;
    })
    .addCase(UpdateProductDetailsSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(UpdateProductDetailsFail, (state, action) => {
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

//get dashboard data
export const getDashboardReducer = createReducer({  }, builder => {
  builder
    .addCase(allDashboardRequest, state => {
      state.loading = true;
    })
    .addCase(allDashboardSuccess, (state, action) => {
      state.loading = false;
      state.dashboard = action.payload;
    })
    .addCase(allDashboardFail, (state, action) => {
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

//get product
export const getUserReducer = createReducer({  }, builder => {
  builder
    .addCase(allUserRequest, state => {
      state.loading = true;
    })
    .addCase(allUserSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(allUserFail, (state, action) => {
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