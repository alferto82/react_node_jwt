import { FETCH_USER,ERROR_RESPONSE } from '../actions/types';
import initialState from './initialState';

export default function (state = initialState.userInfo, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, userInfo: action.payload.user };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
