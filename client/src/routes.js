import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './pages/App';
import NotFoundPage from './components/pages/not-found-page';

// Import static pages
import HomePage from './components/pages/home-page';

// Import authentication related pages
import ResetPassword from './components/auth/reset_password';
import ForgotPassword from './components/auth/forgot_password';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Import dashboard pages
import Dashboard from './pages/Dashboard';


// Import higher order components
import RequireAuth from './components/auth/require_auth';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />
    <Route path="register" component={SignUp} />
    <Route path="login" component={SignIn} />

    <Route path="dashboard">
      <IndexRoute component={RequireAuth(Dashboard)} />
    </Route>

    <Route path="*" component={NotFoundPage} />
  </Route>
);
