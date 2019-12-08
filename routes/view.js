var express = require('express')
var router = express.Router()
var reportTask = require('../models/report_task')
require("body-parser")
var moment = require('moment')
const { generateLog } = require('../helper/generate_log')
const uuid = require('uuid/v1');
const axios = require('axios');


router.get('/login', (req, res, next) => {
    res.render("login");
})


router.post('/login', [], (req, res)=>{
    let {username, password} = req.body;
    
})
module.exports = router;