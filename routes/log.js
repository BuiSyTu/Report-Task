const express = require('express')

const router = express.Router()


// get all logs
router.get('/', (req, res, next) => {
    reportTask.getLogService(req.query)
      .then(result => {
        let rs2 = result.map(item => {
          return {
            id: item.id,
            actionUserId: item.actionuserid,
            type: item.type,
            reportId: item.reportid,
            status: item.status,
            createdTime: item.createdtime,
            service: item.service
          }
        })
        res.json(rs2);
      }).catch(err => {
        res.json({ "status_code": "500" })
      })
  })

  module.exports = router