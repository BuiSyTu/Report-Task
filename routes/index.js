var express = require('express');
var router = express.Router();
var reportTask = require('../models/report_task')
require("body-parser")


/* GET home page. */
router.get('/', function (req, res, next) {
  let data = reportTask.getReportTask()
  data.then(report => {
    id = report.rows[0].id
    console.log(id)
    res.json(report.rows)
  }).catch(() => {
    res.json({ "2": "1" })
  })
})

router.post('/', (req, res, next) => {
  let params = req.body
  let report_elements = Object.keys(params).map(key => {
    return params[key]
  })

  let data = reportTask.addReportTask(report_elements)
  data.then(result => {
    console.log(1)
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.json({ "status_code": 500 })
  })
})

router.get('/:id', function (req, res, next) {
  let id = req.params.id
  let data = reportTask.getReportTaskById(id)
  data.then(report => {
    res.json(report.rows)
  }).catch(() => {
    res.json({ "2": "1" })
  })
})

router.put('/:id', (req, res, next) => {
  let id = parseInt(req.params.id)
  let params = req.body
  let report_elements = Object.keys(params).map(key => {
    return params[key]
  })

  report_elements.push(id)
  let data = reportTask.updateReportTask(report_elements)

  data.then(result => {
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.json({ "status_code": 500 })
  })

})

router.delete('/:id', (req, res, next) => {
  let id = parseInt(req.params.id)
  let data = reportTask.deleteReportTask(id)

  data.then(result => {
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.json({ "status_code": 500 })
  })

})


router.post('/', (req, res, next) => {
  let params = req.body
  let report_elements = Object.keys(params).map(key => {
    return params[key]
  })

  let data = reportTask.addReportTask(report_elements)
  data.then(result => {
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.json({ "status_code": 500 })
  })
})

module.exports = router;
