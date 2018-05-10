const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;
const getRole = require('../helpers').getRole;
const config = require('../config/main');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utils/index')
// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
}

//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {
  
User
    .findOne({
      username: req.body.username
    })
    .select({
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    }) //make sure to not return password (although it is hashed using bcrypt)
    .exec(function(err, user) {
      if (err)
        throw err;
      if (!user) {
        return res.json({
          error: true,
          message: 'Username is not valid'
        });
      }


      bcrypt.compare(req.body.password, user.password, function(err, valid) {
        if (!valid) {
          return res.json({
            error: true,
            message: 'Password is Wrong'
          });
        }

        //make sure to NOT pass password and anything sensitive inside token
        //Pass anything tht might be used in other parts of the app
        
        var token = utils.generateToken(user);
        user = utils.getCleanUser(user);
        res.json({
          user: user,
          token: token
        });
      });
    });  
};


//= =======================================
// Registration Route
//= =======================================
exports.register = function (req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const name = req.body.name;
  const username = req.body.username;
  const surname = req.body.surname;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!name || !surname) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if full username not provided
  if (!username) {
    return res.status(422).send({ error: 'You must enter your username' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

      // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

      // If email is unique and password was provided, create account
    const user = new User({
      username,
      email,
      password,
      profile: { name, surname }
    });

    user.save((err, user) => {
      if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (getRole(foundUser.role) >= getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};

//= =======================================
// Forgot Password Route
//= =======================================

exports.forgotPassword = function (req, res, next) {
  const email = req.body.email;

  User.findOne({ email }, (err, existingUser) => {
    // If user is not found, return error
    if (err || existingUser == null) {
      res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
      return next(err);
    }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
    crypto.randomBytes(48, (err, buffer) => {
      const resetToken = buffer.toString('hex');
      if (err) { return next(err); }

      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      existingUser.save((err) => {
          // If error in saving token, return it
        if (err) { return next(err); }

        const message = {
          subject: 'Reset Password',
          text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'}${req.headers.host}/reset-password/${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

          // Otherwise, send user email via Mailgun
        //mailgun.sendEmail(existingUser.email, message);

        return res.status(200).json({ message: 'Please check your email for the link to reset your password.', temp: message.text});
      });
    });
  });
};

exports.validateUser = function(req, res, next){
  var body = req.body;

  //return res.json({validated: true});
  isUserUnique(body, function(err) {
    if (err) {
      return res.json(err);
    } else {
      return res.json({});
    }
  });
  //return res.status(200).json({ data: 'Validated' });
};

//utility func
function isUserUnique(reqBody, cb) {
  var username = reqBody.username ? reqBody.username.trim() : '';
  var email = reqBody.email ? reqBody.email.trim() : '';

  User.findOne({
    $or: [{
      'username': new RegExp(["^", username, "$"].join(""), "i")
    }, {
      'email': new RegExp(["^", email, "$"].join(""), "i")
    }]
  }, function(err, user) {
    if (err)
      throw err;

    if (!user) {
      cb();
      return;
    }

    var err;
    if (user.username === username) {
      err = {};
      err.username = '"' + username + '" is not unique';
    }
    if (user.email === email) {
      err = err ? err : {};
      err.email = '"' + email + '" is not unique';
    }

    cb(err);
  });
}

//= =======================================
// Reset Password Route
//= =======================================

exports.verifyToken = function (req, res, next) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, resetUser) => {
    // If query returned no results, token expired or was invalid. Return error.
    if (!resetUser) {
      res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
    }

      // Otherwise, save new password and clear resetToken from database
    resetUser.password = req.body.password;
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;

    resetUser.save((err) => {
      if (err) { return next(err); }

        // If password change saved successfully, alert user via email
      const message = {
        subject: 'Password Changed',
        text: 'You are receiving this email because you changed your password. \n\n' +
          'If you did not request this change, please contact us immediately.'
      };

        // Otherwise, send user email confirmation of password change via Mailgun
      //mailgun.sendEmail(resetUser.email, message);

      return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
    });
  });
};


exports.meFromToken = function(req, res, next) {
  console.log("meFromToken....................");
  // check header or url parameters or post parameters for token
 // var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var token = req.body.token || req.query.token || req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  var access_token = token.replace('JWT ',''); 

  // decode token
  jwt.verify(access_token, config.secret, function(err, user) {
    if (err)
      throw err;

    //return user using the id from w/in JWTToken
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err)
        throw err;

      user = utils.getCleanUser(user); //dont pass password and stuff

      //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
      // var token = utils.generateToken(user);

      res.json({
        user: user,
        token: access_token
      });

    });
  });
};
