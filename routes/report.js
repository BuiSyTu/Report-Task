const axios = require('axios');
const express = require('express')

const checkRole = require('../helper/checkRole')
const env = require('../helper/environment')

const router = express.Router()


router.get('/all', [checkRole.hasUserId], async (req, res) => {
  let result = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/`);

  let report = result.data.filter(item => item.hasOwnProperty('doer') && item.doer.id == req.session.infoUser.user.userId);
  // console.log(report);

  res.render('task/allTask', { report });
});

router.get('/:id', [checkRole.hasUserId], async (req, res) => {
  let { id } = req.params;
  let result = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/`);

  let report = result.data.filter(item => item._id == id);

  if (!report.department) {
    report.department = "Không xác định"
  }
 report = {
    _id: report._id,
    name: report.name || "Không xác định",
    description: report.description,
    doer: report.doer.name || "Không xác định",
    coDoers: report.coDoers.length == 0 ? "Không xác định" : report.coDoers.map(item => item.name),
    reviewer: report.reviewer.name || "Không xác định",
    creator: report.creator.name || "Không xác định",
    department: report.department || "Không xác định",
    co_department: report.coDepartments.length == 0 ? "Không xác định" : report.coDepartments.map(item => item.name),
    start: report.start,
    finish: report.due || "Không xác định",
    status: report.status,
    percentComplete: report.percentComplete,

    t:"",
    type: report.type
  }
  res.json(report);
});

module.exports = router;