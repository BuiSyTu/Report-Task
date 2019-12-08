const reportTask = require('../models/report_task')

const generateLog = (req, _status) => {
  if (req.method != "GET") {
    let log = {
      actionUserId: req.body.id,
      type: convertMethod(req.method),
      reportId: req.body.id,
      status: _status,
      createdTime: new Date(),
      service: "Report_task_service"
    }
    reportTask.addLogSerice(log).then(result => {
      console.log('result')
      res.statusCode = 200
    }).catch(err => {
      res.statusCode = 500
    })
  }
}

const convertMethod = method => {
  if (method == "POST") return "CREATE"
  if (method == "PUT") return "UPDATE"
  if (method == "DELETE") return "DELETE"
}

module.exports = {
  generateLog
}