var express = require('express')
var router = express.Router()
var reportTask = require('../models/report_task')
require("body-parser")
var moment = require('moment')
const { generateLog } = require('../helper/generate_log')


router.get('/logs', (req, res, next) => {
  reportTask.getLogService()
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json({ "status_code": "500" })
    })
})


/* GET home page. */
router.get('/', function (req, res, next) {
  generateLog(req)

  reportTask.getAllReportTask()
    .then(report => {
      res.json(report.rows)
    }).catch(() => {
      res.json({ "status_code": "500" })
    })
})

router.post('/', (req, res, next) => {
  generateLog(req)
  let params = req.body
  params.created_time = new Date()
  params.updated_time = new Date()

  reportTask.addReportTask(params)
    .then(result => {
      res.json({ "status_code": 200 })
    }).catch(() => {
      res.json({ "status_code": 500 })
    })
})

router.get('/:id', function (req, res, next) {
  generateLog(req)
  let id = req.params.id

  reportTask.getReportTaskById(id)
    .then(report => {
      res.json(report.rows)
    }).catch(() => {
      res.json({ "status_code": "500" })
    })
})

router.put('/:id', (req, res, next) => {
  generateLog(req)
  let id = parseInt(req.params.id)
  let params = req.body
  params.updated_time = new Date()
  params.id = id

  reportTask.updateReportTask(params)
    .then(result => {
      res.json({ "status_code": 200 })
    }).catch(() => {
      res.json({ "status_code": 500 })
    })

})

router.delete('/:id', (req, res, next) => {
  generateLog(req)
  let id = parseInt(req.params.id)

  reportTask.deleteReportTask(id)
    .then(result => {
      res.json({ "status_code": 200 })
    }).catch(() => {
      res.json({ "status_code": 500 })
    })
})

router.get('/projects/:id', (req, res, next) => {
  generateLog(req)
  let id = parseInt(req.params.id)

  reportTask.getReportByTypeId(id, "project_id")
    .then(result => {
      res.json(result.rows)
    }).catch(err => {
      res.json("status_code: 500")
    })
})

router.get('/departments/:id', (req, res, next) => {
  generateLog(req)
  let id = parseInt(req.params.id)

  reportTask.getReportByTypeId(id, "department_id")
    .then(result => {
      res.json(result.rows)
    }).catch(err => {
      res.json("status_code: 500")
    })
})

router.get('/tasks/:id', (req, res, next) => {
  generateLog(req)
  let id = parseInt(req.params.id)

  reportTask.getReportByTypeId(id, "task_id")
    .then(result => {
      res.json(result.rows)
    }).catch(err => {
      res.json("status_code: 500")
    })
})

module.exports = router
