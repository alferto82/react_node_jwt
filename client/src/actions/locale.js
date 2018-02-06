import { setActiveLanguage } from 'react-localize-redux';

// TO-DO: Add expiration to cookie
export function loadLocales(dispatch) {
  const languages = [
    { name: 'English', code: 'en' },
    { name: 'French', code: 'fr' },
    { name: 'Spanish', code: 'es' }
  ];
 /* store.dispatch(initialize(languages, {defaultLanguage: 'en'}));
  const json_en = require('./locales/en.json');
  const json_es = require('./locales/es.json');
  store.dispatch(addTranslationForLanguage(json_en, 'en'));
  store.dispatch(addTranslationForLanguage(json_es, 'es'));*/
}

// TO-DO: Add expiration to cookie
export function changeLocale({ locale }) {
    return function (dispatch) {
      //dispatch({ type: AUTH_USER });

        dispatch(setActiveLanguage(locale));
    };
  }

  