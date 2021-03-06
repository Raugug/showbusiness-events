const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const bodyParser = require('body-parser');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');



// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {

      
      if(err) {
        reject(console.log(err)/* new Error('Something went wrong') */)
      }else{
        resolve(user);
      }
    })
  })
}

// SIGNUP
router.post('/signup', [ensureLoggedOut(), uploadCloud.single('photo')], (req, res, next) => {
  const {username, email, placeType="User", address, password, password2} = req.body;
  let location = {
    type: 'Point',
    coordinates: [Number(req.body.latitude), Number(req.body.longitude)]
  }
  if(placeType=="User"){
    location.coordinates[0]=0;
    location.coordinates[1]=0;
  }

  //CHECK IF PHOTO
  if (!req.file){
    next(new Error('You must provide a supported image file'));
  }
  const photo = req.file.url;

  //CHECK FIELDS
  if (!username || !password || !password2){
    next(new Error('You must provide valid credentials'));
  }
  if (password != password2){
    next(new Error('You must copy exactly the same password'));
  }

  //USERNAME EXISTS
  User.findOne({ username })
  .then( foundUser => {
    if (foundUser) throw new Error('Username already exists');

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    return new User({
      username,
      password: hashPass,
      email,
      placeType,
      address, 
      photo,
      location
    }).save();
  })
  .then( savedUser => login(req, savedUser)) // Login the user using passport
  .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
  .catch(e => console.log(e));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    // Check for errors
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});


router.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
  }
})


router.get('/logout', (req,res) => {
  req.logout();
  res.status(200).json({message:'logged out'})
});


router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = router;
