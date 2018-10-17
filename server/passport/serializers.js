const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession).populate('eventsGo').populate('favUsers').populate('eventsGo.place')
  .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
  .then(userDocument => {
    cb(null, userDocument);
  })
  .catch(err => {
    cb(err);
  })
});
