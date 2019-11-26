var express = require('express');
var router = express.Router();
var reportTask = require('../models/report_task')
require("body-parser")
var moment = require('moment');
const { generateLog } = require('../helper/generate_log');


router.get('/logs', (req, res, next) => {
  let data = reportTask.getLogService();
  data.then(result => {
    res.statusCode = 200;
    res.json(result);
    // console.log('result.rows: ', result);
    // result.map(test => console.log(test.payload))

  }).catch(err => {
    res.statusCode = 500;
  });

})


/* GET home page. */
router.get('/', function (req, res, next) {
  generateLog(req);
  // reportTask.addLogSerice(log).then(result => {
  //   res.statusCode = 200;
  //   console.log("success");
  // }).catch(err => {
  //   res.statusCode = 500;
  // })

  let data = reportTask.getReportTask()
  data.then(report => {
    res.json(report.rows);

  }).catch(() => {
<<<<<<< HEAD
    res.json({ "status_code": "500" })
=======
    res.json({ main: "main" })
>>>>>>> 23cb6070df1f100f2265b781a9e403c851ce56ee
  })


})

router.post('/', (req, res, next) => {
  generateLog(req);
  let params = req.body;
  params.created_time = new Date();
  params.updated_time = new Date();
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

router.get('/:id', function (req, res, next) {
  generateLog(req);
  let id = req.params.id
  let data = reportTask.getReportTaskById(id)
  data.then(report => {
    res.json(report.rows)
  }).catch(() => {
<<<<<<< HEAD
    res.json({ "status_code": "500" })
=======
    res.json({ id })
>>>>>>> 23cb6070df1f100f2265b781a9e403c851ce56ee
  })
})

router.put('/:id', (req, res, next) => {
  generateLog(req);
  let id = parseInt(req.params.id)
  let params = req.body;
  params.updated_time = new Date();
  let report_elements = Object.keys(params).map(key => {
    return params[key]
  })

  report_elements.push(id);
  let data = reportTask.updateReportTask(report_elements)

  data.then(result => {
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.json({ "status_code": 500 })
  })

})

router.delete('/:id', (req, res, next) => {
  generateLog(req);
  let id = parseInt(req.params.id)
  let data = reportTask.deleteReportTask(id)

  data.then(result => {
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.json({ "status_code": 500 })
  })

})


router.post('/', (req, res, next) => {
  generateLog(req);
  let params = req.body

  let report_elements = Object.keys(params).map(key => {
    return params[key]
  })

  let data = reportTask.addReportTask(report_elements)
  data.then(result => {
    res.statusCode = 200;
    res.json({ "status_code": 200 })
  }).catch(() => {
    res.statusCode = 500;
    res.json({ "status_code": 500 })
  })
})
router.get('/projects/:id', (req, res, next) => {
  generateLog(req);
  let id = parseInt(req.params.id);
  let data = reportTask.getReportByTypeId(id, "project_id");
  data.then(result => {
    res.statusCode = 200;
    // console.log(req.url);
    // console.log(req.method);

    res.json(result.rows);
  }).catch(err => {
    res.statusCode = 500;
    res.json("status_code: 500")
  })
})
router.get('/departments/:id', (req, res, next) => {
  generateLog(req);
  let id = parseInt(req.params.id);
  let data = reportTask.getReportByTypeId(id, "department_id");
  data.then(result => {
    res.json(result.rows);
  }).catch(err => {
    res.json("status_code: 500")
  })
})

router.get('/tasks/:id', (req, res, next) => {
  generateLog(req);
  let id = parseInt(req.params.id);
  let data = reportTask.getReportByTypeId(id, "task_id");
  data.then(result => {
    res.json(result.rows);
  }).catch(err => {
    res.json("status_code: 500")
  })
})





module.exports = router;
