const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const MailController = require('./controllers/mail');
const ActivityController = require('./controllers/activity');
const PollController = require('./controllers/poll');

/** Subida de ficheros multi-part */
const multer = require('multer');
const multerConfig = {
  storage: multer.memoryStorage()
};
/********/
const express = require('express');
const passport = require('passport');
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    mailRoutes = express.Router(),
    activityRoutes = express.Router(),
    pollRoutes = express.Router();


  apiRoutes.use('/auth', authRoutes);
  apiRoutes.use('/user', userRoutes);
  apiRoutes.use('/mail', mailRoutes);
  apiRoutes.use('/activity', activityRoutes);
  apiRoutes.use('/poll', pollRoutes);

  //= ========================
  // Auth Routes
  //= ========================
  // Registration route
  authRoutes.post('/register', AuthenticationController.register);
  // Login route
  authRoutes.post('/login', AuthenticationController.login);
  // Password reset request route (generate/send token)
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);
  authRoutes.post('/validateUser', AuthenticationController.validateUser);
  // Password reset route (change password using token)
  authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);
  //get current user from token
  authRoutes.get('/refresh-token', AuthenticationController.meFromToken);
  

  
  
  apiRoutes.get('/me/from/token', requireAuth, AuthenticationController.meFromToken);

  //= ========================
  // User Routes
  //= ========================
  // View user profile route
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);
  // Test protected route
  userRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });
  userRoutes.get('/admins-only', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
    res.send({ content: 'Admin dashboard is working.' });
  });

  //= ========================
  // Mail Routes
  //= ========================
  mailRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), MailController.viewAll);
  mailRoutes.post('/subscribe', MailController.addMail);

  //= ========================
  // Activity Routes
  //= ========================
  activityRoutes.get('/:username', requireAuth || AuthenticationController.roleAuthorization(ROLE_ADMIN), ActivityController.getActivity);
  activityRoutes.post('/upload',  multer(multerConfig).single('file'), ActivityController.uploadActivity);

  //= ========================
  // Poll Routes
  //= ========================
  pollRoutes.post('/', multer(multerConfig).single('file'), PollController.savePoll);

   // Set url for API group routes
  app.use('/api', apiRoutes);
};
