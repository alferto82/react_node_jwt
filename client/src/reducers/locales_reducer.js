import { UPDATE_LOCALES } from '../actions/types';

const INITIAL_STATE = {
  currentLocale: 'en',
  locales: {},
  
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_LOCALES:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
