import { setActiveLanguage } from 'react-localize-redux';
import { initialize } from 'react-localize-redux';
import { addTranslationForLanguage } from 'react-localize-redux';

export function loadLocales(store) {
  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' }
  ];

  const language = localStorage.getItem('language');

  store.dispatch(initialize(languages, {defaultLanguage: language?language:'en'}));
  const json_en = require('../locales/en.json');
  const json_es = require('../locales/es.json');
  store.dispatch(addTranslationForLanguage(json_en, 'en'));
  store.dispatch(addTranslationForLanguage(json_es, 'es'));
}

export function changeLocale({ locale }) {
    return function (dispatch) {
        dispatch(setActiveLanguage(locale));
    };
  }

  