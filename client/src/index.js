import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers/index';
import cookie from 'react-cookie';
import registerServiceWorker from './registerServiceWorker';
import reduxThunk from 'redux-thunk';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';


import './styles/css/base.css';


import { addTranslationForLanguage } from 'react-localize-redux';
import { initialize } from 'react-localize-redux';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');


////////
const languages = [
  { name: 'English', code: 'en' },
  { name: 'French', code: 'fr' },
  { name: 'Spanish', code: 'es' }
];
store.dispatch(initialize(languages, {defaultLanguage: 'en'}));
const json_en = require('./locales/en.json');
const json_es = require('./locales/es.json');
store.dispatch(addTranslationForLanguage(json_en, 'en'));
store.dispatch(addTranslationForLanguage(json_es, 'es'));


///////





if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.querySelector('.wrapper'));

 // registerServiceWorker();