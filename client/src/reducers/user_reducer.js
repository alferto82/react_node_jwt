import { FETCH_USER,ERROR_RESPONSE } from '../actions/types';
import initialState from './initialState';
import {
  VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAILURE,
  ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
  SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
  SIGNIN_USER, SIGNIN_USER_SUCCESS,  SIGNIN_USER_FAILURE,
	LOGOUT_USER, UPDATE_USER_EMAIL
} from '../actions/users';

const INITIAL_STATE = {user: null, status:null, error:null, loading: false};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_USER:
      return { ...state, userInfo: action.payload.user };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };


    case SIGNUP_USER:// sign up user, set loading = true and status = signup
      return { ...state, user: null, status:'signup', error:null, loading: true}; 
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
      return { ...state, user: action.payload.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
      return { ...state, user: null, status:'signup', error:error, loading: false};
  
    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
      return { ...state, user: null, status:'signin', error:null, loading: true}; 
    case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
      return { ...state, user: action.payload.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNIN_USER_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
      return { ...state, user: null, status:'signin', error:error, loading: false};

    case RESET_USER:
      return { ...state, user: null, status:'signin', error:null, loading: false};

    case LOGOUT_USER:
      return {...state, user:null, status:'logout', error:null, loading: false};

    case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
      return { ...state, user: null, status:'storage', error:null, loading: true}; 
    case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
      return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
     error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors   
      return { ...state, user: null, status:'storage', error:error, loading: false};
    case RESET_TOKEN:// remove token from storage make loading = false
      return { ...state, user: null, status:'storage', error:null, loading: false};


    default:
      return state;
  }
}
