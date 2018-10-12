const express = require("express");
//const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const bodyParser = require('body-parser');

//CREATE EVENT
router.post('/create', (req, res, next)=>{
    let {title, description, artist, artistURL, date, time, type, place} = req.body;
})

module.exports = router;