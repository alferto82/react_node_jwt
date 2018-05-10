import axios from 'axios';



//Validate user fields like name and password
export const VALIDATE_USER_FIELDS = 'VALIDATE_USER_FIELDS';
export const VALIDATE_USER_FIELDS_SUCCESS = 'VALIDATE_USER_FIELDS_SUCCESS';
export const VALIDATE_USER_FIELDS_FAILURE = 'VALIDATE_USER_FIELDS_FAILURE';
export const RESET_VALIDATE_USER_FIELDS = 'RESET_VALIDATE_USER_FIELDS';


//Note when running locally, the node server running on localhost:3000 and the dev-server is running on 8080
//When running on Heroku, we run both on the same port and so just /api is enough.
const ROOT_URL = 'http://localhost:3000/api';//location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function validateUserFields(values) {
  //note: we cant have /users/validateFields because it'll match /users/:id path!
  return function(dispatch){ 
    return axios.post(`${ROOT_URL}/auth/validateUser`, values).then((response) => {
      return {
        type: VALIDATE_USER_FIELDS,
        payload: response
      };
    }).catch((err) => {
      console.log('Error');
    }

    );
  }
};

export function validateUserFieldsSuccess() {
  return {
    type: VALIDATE_USER_FIELDS_SUCCESS
  };
}

export function validateUserFieldsFailure(error) {
  return function(dispatch){ 
    dispatch({
      type: VALIDATE_USER_FIELDS_FAILURE,
      payload: error
    })
  };
}

export function resetValidateUserFields() {
  return {
    type: RESET_VALIDATE_USER_FIELDS
  }
};

