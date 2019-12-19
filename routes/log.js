const express = require('express')

const checkRole = require('../helper/checkRole');
const log_md = require('../models/log')

const router = express.Router()


// get all logs
router.get('/', (req, res, next) => {
  log_md.getLogService(req.query)
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

router.get('/all', [checkRole.hasUserId], (req, res) => {
  log_md.getLogService(req.query)
    .then(rows => {
      console.log('rows: ', rows);
      if(rows.message){
        res.render('log.ejs', {logs: []})
      } else {
        let logs = rows.map(item => {
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
        res.render('log.ejs', { logs })
      }
     
    }).catch(err => {
      res.json({ "status_code": "500" })
    })
})


module.exports = router