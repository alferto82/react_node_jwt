import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { UPDATE_LOCALES} from './types';
import { updateIntl } from 'react-intl-redux';

//= ===============================
// Authentication actions
//= ===============================

// TO-DO: Add expiration to cookie
export function loadLocales() {
  return function (dispatch) {
    dispatch({ type: UPDATE_LOCALES,  
        payload: {
            locales: {
              en: {
                'app.greeting': 'Hello!',
              },
              it: {
                'app.greeting': 'Ciao!',
              },
              zh: {
                'app.greeting': '你好!',
              }
            }
       }});
  };
}

export function changeLocale(locale, messages){
  return function (dispatch) {
    dispatch(updateIntl({
      locale: locale,
      messages: messages,
    }));
    
  };
}
