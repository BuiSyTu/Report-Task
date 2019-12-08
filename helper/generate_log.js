const reportTask = require('../models/report_task')
const uuid = require('uuid/v1');

const generateLog = (req, _status) => {
  if (req.method != "GET") {
    let log = {
      actionUserId: "xxxxxxxxxx",
      type: convertMethod(req.method),
      reportId: "req.body.id",
      status: _status,
      createdTime: new Date().toISOString(),
      service: "Report_task_service"
    }
    console.log(log);
    
    reportTask.addLogSerice(log).then(result => {
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