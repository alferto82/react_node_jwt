const Activity = require('../models/activity');
const User = require('../models/user');
 
exports.uploadActivity = function (req, res, next) {
  const username = req.body.username;
  let obj = JSON.parse(req.file.buffer);

  User.findOne({username: username}).exec().then((existingUser) => {
    return Activity.findOne({'user': existingUser._id, activityDate: obj.date}).exec().then(function(existingActivity){
      return [existingUser, existingActivity];
    });
  }).then((result) => {
    let existingUser = result[0];
    let existingActivity = result[1];
    if (existingUser == null) {
      return res.status(422).json({ error: 'Username ' + existingUser.username + ' is not registered. Please register the user before adding an activity' });
    }
    if (existingActivity != null) {
      return res.status(422).json({ error: 'Activity is already inserted' });
    }

    let activity = new Activity({
      user: existingUser,
      activityDate: obj.date,
      positions: obj.positions.map((elem)=>{
        return{
          latitude: elem.latitude,
          longitude: elem.longitude,
          altitude: elem.altitude,
          speed: elem.speed,
          power: elem.power,
          time: elem.time
        };
      })
    });

    activity.save((err, activity) => {
      if (err) { return next(err); }
        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);
      res.status(200).json({
        msg: 'Activity uploaded correctly'
      });
    });
  });
};

exports.getActivity = function (req, res, next) {
  const username = req.params.username;
  
  User.findOne({username: username}).exec().then((existingUser) => {
    return Activity.find({'user': existingUser._id}).exec().then(function(existingActivities){
      return [existingUser, existingActivities];
    });
  }).then((result) => {
    let existingUser = result[0];
    let existingActivities = result[1];
    if (existingUser == null) {
      return res.status(422).json({ error: 'Username ' + existingUser.username + ' is not registered. Please register the user before adding an activity' });
    }
    

    return res.status(200).json({ activities: existingActivities });
  });
}
