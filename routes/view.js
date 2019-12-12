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
var departmentApi = require('../otherApi/departmentApi');


router.get('/report/:id', [checkRole.hasUserId], (req, res, next) => {
    let { id } = req.params;

    reportTask.getReportTaskById(id)
        .then(report => {
            res.json(report.rows)
        }).catch(() => {
            res.json('fail r em oi')
        })
});


router.get('/login', (req, res, next) => {
    console.log('req.session.validUrl: ', req.session.validUrl);
    res.render("login", { message: req.session.validUrl });
})


router.post('/login/', [], (req, res) => {
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
        res.redirect(req.session.validUrl || '/');

    }).catch(err => {

        console.log(err);

    });
})

router.get('/report-list', [checkRole.hasUserId], (req, res, next) => {
    axios.get(env.baseUrl + '/admin/report-list').then(async result => {
        // result.data.map(item => {
        //     item.department_name = "xxx";
        //     // console.log(item);

        //     return item;
        // })
        await Promise.all(result.data.map(async item => {

            let departInfo = await departmentApi.getDepartmentById(item.department_id);
            item.department_name = departInfo.depart_name;

            return item;
        })).then(result => {
            res.render("reportList", { report: result });
        });

    });
});

router.get('/department/:id', async (req, res) => {
    // id = '5deb052c0351e97280dd297f';
    let { id } = req.params;
    let test = await departmentApi.getDepartmentById(id);
    console.log(test);
    
    res.json(test);
})

// router.get('/temperature')

module.exports = router;