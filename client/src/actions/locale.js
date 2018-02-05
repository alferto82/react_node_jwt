import { setActiveLanguage } from 'react-localize-redux';

// TO-DO: Add expiration to cookie
export function changeLanguage({ locale }) {
    return function (dispatch) {
      //dispatch({ type: AUTH_USER });

        dispatch(setActiveLanguage(locale));
    };
  }