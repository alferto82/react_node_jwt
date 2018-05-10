const Mail = require('../models/mail');
const constants = require('../constants');

exports.viewAll = function (req, res, next) {
  if (req.user.role !== constants.ROLE_ADMIN) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  Mail.find({}, (err, mails) => {
    if (err) {
      res.status(400).json({ error: 'No mail could be found for this ID.' });
      return next(err);
    }
 
    return res.status(200).json({ mails: mails });
  });
};

exports.addMail = function (req, res, next) {
  const email = req.body.email;

  Mail.findOne({email: email}, (err, existingMail) => {
    if (err) { return next(err); }

      // If mail is not unique, return error
    if (existingMail) {
      return res.status(422).send({ error: 'That email address is already subscribed.' });
    }
 
    const mail = new Mail({
      email
    });

    mail.save((err, mail) => {
      if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

      res.status(200).json({
        message: 'Email ' + mail.email + ' subscribed correctly.',
      });
    });
  });
};

