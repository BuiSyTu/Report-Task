const express = require('express')
const router = express.Router()
const reportTask = require('../models/report_task');
require("body-parser");
const moment = require('moment');
const uuid = require('uuid/v1');
const axios = require('axios');
const checkRole = require('../helper/checkRole')


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


router.get('/report/:id', (req, res, next) => {
  let id = req.params.id

  reportTask.getReportTaskById(id)
    .then(report => {
      res.json(JSON.stringify(report.rows[0]));
    }).catch(() => {
      res.json({ "status_code": "500" })
    })
})


router.get('/info', [checkRole.hasUserId], (req, res) => {
  res.json(req.session.infoUser);
})


module.exports = router;