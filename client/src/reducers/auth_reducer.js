import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from '../actions/types';
import initialState from './initialState';

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
    console.log(state, action);
      return { ...state, error: '', message: '', authenticated: true , userInfo: action.userInfo};
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, message: action.payload.message };
    case RESET_PASSWORD_REQUEST:
      return { ...state, message: action.payload.message };
    case PROTECTED_TEST:
      console.log(state, action);
      return { ...state, content: action.payload.message };
    default:
      return state;
  }
}
