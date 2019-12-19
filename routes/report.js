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
  report = report[0];
  if (!report.department) {
    report.department = "Không xác định"
  }
  console.log(report);
  
 report = {
    _id: report._id,
    name: report.name,
    description: report.description,
    doer: report.doer || "Không xác định",
    // coDoers: report.coDoers.length == 0 ? "Không xác định" : report.coDoers.map(item => item.name),
    // reviewer: report.reviewer.name || "Không xác định",
    // creator: report.creator.name || "Không xác định",
    coDoers: report.coDoers,
    reviewer: report.reviewer,
    creator: report.creator,
    department: report.department,
    coDepartments: report.coDepartments,
    // coDepartments: report.coDepartments.length == 0 ? "Không xác định" : report.coDepartments.map(item => item.name),
    start: report.start,
    due: report.due || "Không xác định",
    comment: report.comment,
    percentComplete: report.percentComplete,
    type: report.type,
    status: report.status,
    createdAt:report.createdAt,
    updatedAt: report.updatedAt
  }
  // console.log(report);
  // res.json(report);
  res.render('task/detailTask', {report});
});

module.exports = router;