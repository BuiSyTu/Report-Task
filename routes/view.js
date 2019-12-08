var express = require('express')
var router = express.Router()
var reportTask = require('../models/report_task')
require("body-parser")
var moment = require('moment')
const { generateLog } = require('../helper/generate_log')
const uuid = require('uuid/v1');
const axios = require('axios');
const env = require('../helper/environment');
var checkRole = require('../helper/checkRole');
router.get('/login', (req, res, next) => {
    res.render("login");
})


router.post('/login', [], (req, res) => {
    let { username, password } = req.body;

    axios({
        method: 'post',
        url: 'https://api-ptpmpt-18.herokuapp.com/api/auth/login',
        data: {
            username: username,
            password: password
        }
    }).then(result => {
        
        req.session.infoUser = result.data;
        console.log(req.session);
        res.json(result.data);
    }).catch(err => {
        console.log(err);

    });
})

router.get('/report-list',[checkRole.hasUserId], (req, res, next) => {
    let link = env.baseUrl;

    axios.get(link).then(result=>{
        console.log(result.data);
        
    });
    res.render("reportList");
});
module.exports = router;