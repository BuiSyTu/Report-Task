const reportTask = require('../models/report_task')

const generateLog = req => {
    let log = {
        method: req.method,
        path: req.url,
        payload: req.body,
        created_at: new Date()
    };
    reportTask.addLogSerice(log).then(result => {
        res.statusCode = 200;
        return true;
        // console.log("success");
      }).catch(err => {
        res.statusCode = 500;
        return false;
      })
    return true;
}

module.exports = {
    generateLog
}