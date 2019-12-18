const uuid = require('uuid/v1');

const reportTask = require('../models/report_task')


const generateLog = (req, _status) => {
  let createdTime = new Date();
  createdTime.setHours(createdTime.getHours() + 7);
  if (req.method != "GET") {
    let log = {
      actionUserId: uuid(),
      type: convertMethod(req.method),
      reportId: "req.body.id",
      status: convertStatus(_status),
      createdTime: createdTime.toISOString(),
      service: "Report_task_service"
    }
    // console.log(log);

    reportTask.addLogSerice(log).then(result => {
      res.statusCode = 200
    }).catch(err => {
      res.statusCode = 500
    })
  }
}


const convertMethod = method => {
  if (method == "POST") return "CREATE"
  if (method == "PUT") return "EDIT"
  if (method == "DELETE") return "DELETE"
}


const convertStatus = status => {
  if (status == 200 || status == "200") return "SUCCESS"
  if (status == 500 || status == "500") return "ERROR"
}



module.exports = {
  generateLog
}