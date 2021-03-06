const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const bodyParser = require('body-parser');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const moment = require('moment')
const uploadCloud = require('../config/cloudinary.js');



//CREATE EVENT
router.post('/create', [ensureLoggedIn(), uploadCloud.single('photo')], (req, res, next)=>{
    let {title, description, artist, artistURL, video, date, datestr, time, price, type, place} = req.body;
    const photo = req.file.url;
    Event.create({title, description, artist, photo, artistURL, video, date, datestr, time, price, type, place})
    .then(event => 
        User.findByIdAndUpdate(event.place, {$push: {eventsHost: event._id}}, {new:true}).populate('eventsGo').populate('eventsGo.place')
        .populate('favUsers').populate('eventsHost').populate('eventsHost.place').populate('favPlaces').populate('followUsers').populate('followPlaces')
        .then(user =>
            res.json({status: 'EVENT CREATED IN BACK, USER UPDATED', user, event})

            )
    ).catch(e => next(e))
})

//EVENTS LIST
router.get('/all', (req, res, next) => {
    Event.find().sort({date: 1, time: 1}).populate('place').populate('joined').then(events => 
        res.json({status: 'ALL EVENTS', events})
    ).catch(e => console.log(e))
})

//EVENTS LIST TODAY, THIS WEEK & MONTH
router.get('/today', (req, res, next) => {
    let thisweek = moment().endOf('day')
    Event.find({date: { $lte: thisweek }}).populate('place').populate('joined').then(events => 
        res.json({status: 'EVENTS THIS WEEK', events})
    ).catch(e => console.log(e))
})

router.get('/thisweek', (req, res, next) => {
    let thisweek = moment().endOf('isoWeek')
    Event.find({date: { $lte: thisweek }}).sort({date: 1, time: 1}).populate('place').populate('joined').then(events => 
        res.json({status: 'EVENTS THIS WEEK', events})
    ).catch(e => console.log(e))
})

router.get('/thismonth', (req, res, next) => {
    let thismonth = moment().endOf('month')
    Event.find({date: { $lte: thismonth }}).populate('place').populate('joined').then(events => 
        res.json({status: 'EVENTS THIS MONTH', events})
    ).catch(e => console.log(e))
})

router.get('/:eventId', (req, res, next) => {
    Event.findById(req.params.eventId).populate('place').populate('joined').then(event => 
        res.status(200).json(event))
        .catch(e => console.log(e))
    })

module.exports = router;