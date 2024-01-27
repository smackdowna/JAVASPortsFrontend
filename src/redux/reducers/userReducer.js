import { createReducer } from '@reduxjs/toolkit';

const loginRequest = 'loginRequest';
const loginSuccess = 'loginSuccess';
const loginFail = 'loginFail';

const logOutRequest = 'logOutRequest';
const logOutSuccess = 'logOutSuccess';
const logOutFail = 'logOutFail';

const loadUserRequest = 'loadUserRequest';
const loadUserSuccess = 'loadUserSuccess';
const loadUserFail = 'loadUserFail';

const clearError = 'clearError';
const clearMessage = 'clearMessage';

export const loginReducer = createReducer({}, builder => {
  builder
    .addCase(loginRequest, state => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase(loginFail, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase(logOutRequest, state => {
      state.loading = true;
    })
    .addCase(logOutSuccess, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    })
    .addCase(logOutFail, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })
    .addCase(loadUserRequest, state => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loadUserFail, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});
