const API_URL = "http://localhost:3000/api";
//const API_URL = "http://localhost:9000/api";
const CLIENT_ROOT_URL = "http://localhost:5000"

export const config =  {
  TIME_DELAY_NAVIGATION: 1500,
  API_URL: API_URL,
  CLIENT_ROOT_URL: CLIENT_ROOT_URL,

  CLIENT_ROOT_URL_LOGIN: CLIENT_ROOT_URL + '/login',
  url:{
    API_URL_LOGIN: API_URL + '/auth/login',
    API_URL_PROTECTED: API_URL + '/protected',
    API_URL_REGISTER: API_URL + '/auth/register',
    API_URL_FORGOT_PASSWORD: API_URL + '/auth/forgot-password',
    API_URL_RESET_PASSWORD: API_URL + '/auth/reset-password',
    API_URL_VALIDATION_USER: API_URL + '/auth/validationUser',
  },
  analytics: {
    google: {
      trackingId: 'UA-000000-01'
    }
  }
}
