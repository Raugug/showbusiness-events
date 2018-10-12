const express = require("express");
//const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const bodyParser = require('body-parser');

//CREATE EVENT
router.post('/create', (req, res, next)=>{
    let {title, description, artist, artistURL, video, date, time, type, place} = req.body;
    Event.create({title, description, artist, artistURL, video, date, time, type, place})
    .then(event => 
        User.findByIdAndUpdate(event.place, {$push: {eventsHost: event._id}})
        .then(user =>
            res.json({status: 'EVENT CREATED IN BACK, USER UPDATED', user})

            )
    ).catch(e => next(e))
})

//MY EVENTS BY PLACE
router.get('/myprogram', (req,res, next)=>{
    User.find()
})

module.exports = router;