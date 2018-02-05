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
import { addLocaleData } from 'react-intl'

import { IntlProvider, intlReducer, updateIntl } from 'react-intl-redux'
import itLocaleData from 'react-intl/locale-data/it'
import zhLocaleData from 'react-intl/locale-data/zh'
import { FormattedMessage } from 'react-intl';

import './styles/css/base.css';

addLocaleData([...itLocaleData, ...zhLocaleData]);
const UPDATE_LOCALES = 'UPDATE_LOCALES';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');


if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
  <Provider store={store}>
  <IntlProvider locale="it">
  
  <div>
  <FormattedMessage id="app.greeting" defaultMessage="Hello!" />
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
    </div>
    </IntlProvider>
  
  </Provider>,
  document.querySelector('.wrapper'));

 // registerServiceWorker();