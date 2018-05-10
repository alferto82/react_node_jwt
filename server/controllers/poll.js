const Poll = require('../models/poll');
const User = require('../models/user');

//= =======================================
// User Routes
//= =======================================
exports.savePoll = function (req, res, next) {
  const username = req.body.username;
  let obj = JSON.parse(req.file.buffer);
  
  User.findOne({username: username}).then((existingUser) => {
    return Poll.findOne({'user': existingUser._id}).exec().then(function(existingPoll){
      return [existingUser, existingPoll];
    });
  }).then((result) => {
    let existingUser = result[0];
    let existingPoll = result[1];

    if (existingUser === null) {
      return res.status(400).json({ error: 'No user could be found for this ID.' });
    }
    if (existingPoll != null) {
      return res.status(422).json({ error: 'Poll is already inserted' });
    }

    let questions = obj.map((elem)=>{
      return{
        id: elem.id,
        question: elem.question,
        answer: elem.answer
      };
    });

    let poll = new Poll({
      user: user,
      questions: questions
    });

    poll.save((err, poll) => {
      if (err) { return next(err); }
      res.status(200).json({
        msg: 'Poll saved correctly'
      });
    });
    return res.status(200).json({ user: user });
  });
};
