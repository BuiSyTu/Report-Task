var express = require('express')
var router = express.Router()
var reportTask = require('../models/report_task')
require("body-parser")
var moment = require('moment')
const { generateLog } = require('../helper/generate_log')
const uuid = require('uuid/v1');
const axios = require('axios');


router.get('/create_report/:id', (req, res, next) => {
  generateLog(req)
  id = req.params.id
  link = `https://falling-frog-38743.pktriot.net/api/recurrent-tasks/${id}`
  axios.get(link)
    .then(respond => {
      if (!respond.data.finish) {
        respond.data.finish = 'Không xác định'
      }
      if (respond.data.coDepartments.length == 0) {
        respond.data.coDepartments = [{ name: 'Không xác định' }]
      }
      respond.data.id = id
      res.render('report.ejs', respond.data)
    })
})

router.post('/create_report/:id/', (req, res, next) => {
  let params = req.body
  console.log(params);

  params.created_time = new Date()
  params.updated_time = new Date()
  params.id = uuid()
  params.user_id = uuid()
  params.department_id = uuid()
  params.name = "Bao cao so 1"

  params.content = JSON.stringify({
    doer: params.doer,
    co_doer: params.co_doer,
    reviewer: params.reviewer,
    creator: params.creator,
    co_department: params.co_department,
    start: params.start,
    finish: params.finish,
    status: params.status
  })

  params.status = 1

  console.log(params);


  reportTask.addReportTask(params)
    .then(result => {
      status = 200
      generateLog(req, status)
      res.json({ "status_code": status })
    }).catch(() => {
      status = 500
      generateLog(req, status)
      res.json({ "status_code": status })
    })
})


router.get('/logs', (req, res, next) => {
  console.log(req.query);
  reportTask.getLogService(req.query)
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
      for (i = 0; i < report.rows.length; i++) {
        report.rows[i].content = JSON.parse(report.rows[i].content)
      }
      res.json(report.rows)
    }).catch(() => {
      res.json({ "status_code": "500" })
    })
})

router.post('/', (req, res, next) => {
  let params = req.body
  params.created_time = new Date()
  params.updated_time = new Date()
  params.id = uuid()
  console.log(params.id);


  reportTask.addReportTask(params)
    .then(result => {
      status = 200
      generateLog(req, status)
      res.json({ "status_code": 200 })
    }).catch(() => {
      status = 500
      generateLog(req, status)
      res.json({ "status_code": 500 })
    })
})

router.get('/:id', function (req, res, next) {
  let id = req.params.id

  reportTask.getReportTaskById(id)
    .then(report => {
      report.rows[0].content = JSON.parse(report.rows[0].content)
      res.json(report.rows)
    }).catch(() => {
      res.json({ "status_code": "500" })
    })
})

router.put('/:id/', (req, res, next) => {
  let params = req.body
  let id = req.params.id
  params.updated_time = new Date()
  params.id = id

  reportTask.updateReportTask(params)
    .then(result => {
      status = 200
      generateLog(req, status)
      res.json({ "status_code": 200 })
    }).catch(() => {
      status = 500
      generateLog(req, status)
      res.json({ "status_code": 500 })
    })
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id

  reportTask.deleteReportTask(id)
    .then(result => {
      status = 200
      generateLog(req, status)
      res.json({ "status_code": 200 })
    }).catch(() => {
      status = 500
      generateLog(req, status)
      res.json({ "status_code": 500 })
    })
})

router.get('/projects/:id', (req, res, next) => {
  generateLog(req)
  let id = req.params.id

  reportTask.getReportByTypeId(id, "project_id")
    .then(result => {
      res.json(result.rows)
    }).catch(err => {
      res.json("status_code: 500")
    })
})

router.get('/departments/:id', (req, res, next) => {
  generateLog(req)
  let id = req.params.id

  reportTask.getReportByTypeId(id, "department_id")
    .then(result => {
      res.json(result.rows)
    }).catch(err => {
      res.json("status_code: 500")
    })
})

router.get('/tasks/:id', (req, res, next) => {
  generateLog(req)
  let id = req.params.id

  reportTask.getReportByTypeId(id, "task_id")
    .then(result => {
      res.json(result.rows)
    }).catch(err => {
      res.json("status_code: 500")
    })
})

module.exports = router
