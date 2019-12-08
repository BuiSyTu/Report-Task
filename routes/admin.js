var express = require('express')
var router = express.Router()
var reportTask = require('../models/report_task');
require("body-parser");
var moment = require('moment');
const uuid = require('uuid/v1');
const axios = require('axios');


router.get('/report-list', (req, res, next) => {
    
    reportTask.getAllReportTask()
        .then(report => {
            for (i = 0; i < report.rows.length; i++) {
                report.rows[i].content = JSON.parse(report.rows[i].content)
            }
            res.json(report.rows);
            
            
        }).catch(() => {
            
            
            res.json({ "status_code": "500" })
        })
})

module.exports = router;