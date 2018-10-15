const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/myprofile', ensureLoggedIn(), (req, res, next) => {
    User.findById(req.user._id)
    .then(user => {
      let owner= true;
      res.render('user/profile', {player,
        owner, 
        playerStr: JSON.stringify(player)
      });
    }).catch(err => next(err))
});

// GET PROFILE BY ID
router.get('/:userId', /* ensureLoggedIn('../auth/currentuser'), */ (req, res, next) => {
    console.log("ENTRA EN GET POR ID")
    const userId = req.params.userId;
    User.findById(userId)
    .then(user => res.status(200).json(user))
})

//GET EDIT FORM
router.get('/edit/:userId', (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
    .then(user => res.status(200).json(user))
})
  
//PUT EDIT
router.put('/edit', (req, res, next)=> {
    let {id, username, email, placeType} = req.body;
    console.log("ENTRA EN PUT", id)
    
    
    //Check fields
    if (!username || !email){
        next(new Error('You must provide valid fields'));
    }
    
    //Username exists
   /*  User.findOne({$and: [{_id: {$ne: id}},{username: username}]})
    .then( foundUser => {
        console.log("IDDD", id)
        console.log("foundUser", foundUser)
    if (foundUser) {
        throw new Error('Username already exists');
    }}).catch(e => console.log(e)); */
    if (placeType == "User"){

        User.findByIdAndUpdate(id, {username, email}, {new:true})
        .then( user =>{
            console.log("DENTROH", user) 
            res.status(200).json(user)}) // Answer JSON
            .catch(e => console.log(e));
    }
    else{

        User.findByIdAndUpdate(id, {username, email, placeType}, {new:true})
        .then( user =>{
            console.log("DENTROH", user) 
            res.status(200).json(user)}) // Answer JSON
            .catch(e => console.log(e));

    }
    })
//})



module.exports = router;