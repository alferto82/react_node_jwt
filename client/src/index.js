import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers/index';
import cookie from 'react-cookie';
import reduxThunk from 'redux-thunk';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';

import './styles/css/base.css';
import { loadLocales } from './actions/locale';
import { config } from './config';

// Initialize Google Analytics
ReactGA.initialize(config.analytics.google.trackingId);

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');

// Load defined locales
loadLocales(store);

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