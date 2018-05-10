import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import {  errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from './types';

import {config } from '../config';
//= ===============================
// Authentication actions
//= ===============================



export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    //cookie.remove('user', { path: '/' });

      setTimeout(function () {
        window.location.href = config.CLIENT_ROOT_URL_LOGIN;
     }, config.TIME_DELAY_NAVIGATION);
  };
}

export function getForgotPasswordToken({ email }) {
  console.log(email,config.api.API_URL_FORGOT_PASSWORD);
  return function (dispatch) {
    axios.post(config.api.API_URL_FORGOT_PASSWORD, { email })
    .then((response) => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: response.data.message,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function resetPassword(token, { password }) {
  return function (dispatch) {
    axios.post(config.api.API_URL_RESET_PASSWORD + '/' + token, { password })
    .then((response) => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: response.data.message,
      });
      // Redirect to login page on successful password reset
      browserHistory.push('/login');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function protectedTest() {
  return function (dispatch) {
    axios.get(config.api.API_URL_PROTECTED, {
      headers: { Authorization: cookie.load('token') },
    })
    .then((response) => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}
