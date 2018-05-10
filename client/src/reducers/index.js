import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import validationUserFields from './reducer_validateUserFields';
import {localeReducer} from 'react-localize-redux';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  validationUser: validationUserFields,
  locale : localeReducer
});

export default rootReducer;
