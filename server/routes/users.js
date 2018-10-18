const express = require('express');
const User = require('../models/User');
const Event = require("../models/Event");
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//GET ALL PLACES LIST
router.get('/places/all', (req, res, next) => {
    console.log("ENTRA EN PLACES ALL")
    User.find({ placeType: { $ne: "User" } }).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('eventsHost.place').populate('favPlaces').populate('followUsers').populate('followPlaces')
    .then(places => {
        console.log("ALL PLACES DE VUeLTA", places)
        res.status(200).json(places)})
    .catch(e => console.log(e))
})

//GET PLACES BY TYPE
router.get('/places/:placeType', (req, res, next) => {
    let placeType = req.params.placeType;
    User.find({ placeType: placeType}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('eventsHost.place').populate('favPlaces').populate('followUsers').populate('followPlaces')
    .then(places => res.status(200).json(places))
    .catch(e => console.log(e))
})

//GET PROFILE BY ID
router.get('/:userId', /* ensureLoggedIn('../auth/currentuser'), */ (req, res, next) => {
    console.log("ENTRA EN GET POR ID")
    const userId = req.params.userId;
    User.findById(userId).populate('eventsGo').populate('favUsers').populate('eventsGo.place')
    .populate('eventsHost').populate('eventsHost.place').populate('favPlaces').populate('followUsers').populate('followPlaces')
    .then(user => res.status(200).json(user))
})

//GET EDIT FORM
router.get('/edit/:userId', (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId).populate('eventsGo').populate('favUsers').populate('eventsGo.place')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
    .then(user => res.status(200).json(user))
})

//PUT ADD EVENT, ADD PLACE, ADD FAVUSER
router.put('/add/joinevent', (req, res, next)=> {
    let {id, eventId} = req.body;
    //console.log("ENTRA EN PUT", id, eventId)
    User.findByIdAndUpdate(id, {$push: {eventsGo: eventId}}, {new:true}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces').populate('eventsGo.place')
        .then( user =>{
            Event.findByIdAndUpdate(eventId, {$push: {joined: id}}, {new:true}).populate('place').populate('joined')
                .then(event=>{
                    res.status(200).json({user, event})}) // Answer JSON
        })
        .catch(e => console.log(e));
})

router.put('/add/favuser', (req, res, next)=> {
    let {id, favId} = req.body;
    //console.log("ENTRA EN PUT", id, eventId)
    User.findByIdAndUpdate(id, {$push: {favUsers: favId}}, {new:true}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces').populate('eventsGo.place')
        .then( user =>{
            User.findByIdAndUpdate(favId, {$push: {followUsers: id}}, {new:true}).populate('eventsGo').populate('favUsers')
            .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
                .then(userfollowed => {
                    res.status(200).json({user, userfollowed})}) // Answer JSON

        }) 
        .catch(e => console.log(e));
})

router.put('/add/followplace', (req, res, next)=> {
    let {id, placeId} = req.body;
    //console.log("ENTRA EN PUT", id, eventId)
    User.findByIdAndUpdate(id, {$push: {favPlaces: placeId}}, {new:true}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
        .then( user =>{ 
            User.findByIdAndUpdate(placeId, {$push: {followPlaces: id}}, {new:true}).populate('eventsGo').populate('favUsers')
            .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
                .then(placefollowed => {
                    res.status(200).json({user, placefollowed})}) // Answer JSON

        }) 
        .catch(e => console.log(e));
})

//PUT DELETE EVENT, DELETE PLACE, DELETE FAVUSER

router.put('/delete/joinevent', (req, res, next)=> {
    let {id, eventId} = req.body;
    //console.log("ENTRA EN PUT", id, eventId)
    User.findByIdAndUpdate(id, {$pull: {eventsGo: eventId}}, {new:true}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
        .then( user =>{
            Event.findByIdAndUpdate(eventId, {$pull: {joined: id}}, {new:true}).populate('place').populate('joined')
                .then(event=>{
                    res.status(200).json({user, event})}) // Answer JSON
        })
        .catch(e => console.log(e));
})

router.put('/delete/favuser', (req, res, next)=> {
    let {id, favId} = req.body;
    //console.log("ENTRA EN PUT", id, eventId)
    User.findByIdAndUpdate(id, {$pull: {favUsers: favId}}, {new:true}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
        .then( user =>{
            User.findByIdAndUpdate(favId, {$pull: {followUsers: id}}, {new:true}).populate('eventsGo').populate('favUsers')
            .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
                .then(userfollowed => {
                    res.status(200).json({user, userfollowed})}) // Answer JSON

        }) 
        .catch(e => console.log(e));
})

router.put('/delete/followplace', (req, res, next)=> {
    let {id, placeId} = req.body;
    //console.log("ENTRA EN PUT", id, eventId)
    User.findByIdAndUpdate(id, {$pull: {favPlaces: placeId}}, {new:true}).populate('eventsGo').populate('favUsers')
    .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
        .then( user =>{ 
            User.findByIdAndUpdate(placeId, {$pull: {followPlaces: id}}, {new:true}).populate('eventsGo').populate('favUsers')
            .populate('eventsHost').populate('favPlaces').populate('followUsers').populate('followPlaces')
                .then(placefollowed => {
                    res.status(200).json({user, placefollowed})}) // Answer JSON

        }) 
        .catch(e => console.log(e));
})




////PUT EDIT
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

        User.findByIdAndUpdate(id, {username, email}, {new:true}).populate('eventsGo').populate('favUsers')
        .populate('favPlaces').populate('followUsers').populate('followPlaces').populate('eventsHost')
        .then( user =>{
            console.log("DENTROH", user) 
            res.status(200).json(user)}) // Answer JSON
            .catch(e => console.log(e));
    }
    else{

        User.findByIdAndUpdate(id, {username, email, placeType}, {new:true}).populate('eventsGo').populate('favUsers')
        .populate('favPlaces').populate('followUsers').populate('followPlaces').populate('eventsHost')
        .then( user =>{
            console.log("DENTROH", user) 
            res.status(200).json(user)}) // Answer JSON
            .catch(e => console.log(e));

    }
    })
//})



module.exports = router;