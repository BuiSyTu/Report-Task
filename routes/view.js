require("body-parser")

const axios = require('axios');
const express = require('express')

const apiNhomHuy = require('../otherApi/apiNhomHuy');
const checkRole = require('../helper/checkRole');
const departmentApi = require('../otherApi/departmentApi');
const env = require('../helper/environment');
const { generateLog } = require('../helper/generate_log')
const { generateReport } = require('../helper/generate_report');
const reportTask = require('../models/report_task')
const statistic_report = require('../models/statistic_report')

const router = express.Router()


router.get('/report/:id', [checkRole.hasUserId], (req, res, next) => {
    let { id } = req.params;

    reportTask.getReportTaskById(id)
        .then(report => {
            res.json(report.rows)
        }).catch(() => {
            res.json('fail r em oi')
        })
});


router.get('/login', (req, res, next) => {
    res.render("login", { message: req.session.validUrl, error: false });
})


router.post('/login/', [], (req, res) => {
    let { username, password } = req.body;

    axios({
        method: 'post',
        url: 'https://api-ptpmpt-18.herokuapp.com/api/auth/login',
        data: {
            username: username,
            password: password
        }
    }).then(result => {
        req.session.infoUser = result.data;

        env.headers = {
            Authorization: 'bearer ' + result.data.token
        };

        if (result.data.token) {
            res.redirect(req.session.validUrl || '/reports/all');
        }
        else {
            res.render("login", {
                message: req.session.validUrl,
                error: result.data.errors[0].mes
            });
        }
    }).catch(err => {
    });
})


router.get('/report-list', [checkRole.hasUserId], (req, res, next) => {
    axios.get(env.baseUrl + '/admin/report-list').then(async result => {
        await Promise.all(result.data.map(async item => {
            let departInfo = await departmentApi.getDepartmentById(item.department_id);
            item.department_name = departInfo.depart_name;
            return item;
        })).then(result => {
            res.render("reportList", { report: result });
        });

    });
});


router.get('/department/:id', async (req, res) => {
    // id = '5deb052c0351e97280dd297f';
    let { id } = req.params;
    let test = await departmentApi.getDepartmentById(id);
    res.json(test);
});


router.get('/statistic_report', [checkRole.hasUserId], async (req, res) => {
    res.render('statisticReport', { start: null, end: null, report: false })
})


router.post('/statistic_report', [checkRole.hasUserId], async (req, res) => {
    let { start, end } = req.body;

    let report = await generateReport(start, end, req);
    report = report[0];
    reportTask.addReportStatisticTask(report)
        .then(result => {
            generateLog(req, 200)
            res.render('statisticReport', { start, end, report })
        }).catch(err => {
            generateLog(req, 500)
            return res.json({ status_code: 500 })
        })

})


router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('login')
})


router.get('/all-statistic-report', [checkRole.hasUserId], (req, res) => {
    statistic_report.getReportsByCreatorId(req.session.infoUser.user.userId)
        .then(report => {
            statistic_report.getReports(req.session.infoUser.user.username)
                .then(reportShare => {
                    res.render('statistic/allStatisticReport', { report, reportShare });
                })
        })
        .catch(err => {
            return res.json({ status_code: 500 })
        })
})


router.get('/all-statistic-report/:id', [checkRole.hasUserId], (req, res) => {
    let { id } = req.params;
    reportTask.getStatisticReportByTypeId(id, 'id')
        .then(report => {
            console.log('report: ', report);

            res.render('statistic/detailStatisticReport', { report })
        }).catch(() => {
            res.json({ "status_code": 500 })
        })
})


router.delete('/all-statistic-report/:id', [checkRole.hasUserId], (req, res) => {
    let { id } = req.params;
    reportTask.deleteStatisticReportTask(id)
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

router.get('/aboutUs', [checkRole.hasUserId], (req, res) => {
    res.render('aboutUs');
})




module.exports = router;