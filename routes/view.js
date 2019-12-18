require("body-parser")

const axios = require('axios');
const express = require('express')

const apiNhomHuy = require('../otherApi/apiNhomHuy');
const checkRole = require('../helper/checkRole');
const departmentApi = require('../otherApi/departmentApi');
const env = require('../helper/environment');
const { generateReport } = require('../helper/generate_report');
const reportTask = require('../models/report_task')

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
            res.redirect('/reports/all');
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


router.get('/fake_report', [checkRole.hasUserId], async (req, res) => {
    let idReport = await apiNhomHuy.getIdToCreateReport();
    let urlCreateReport = req.protocol + '://' + req.get('host') + '/create_report/'

    for (let i = 0; i < 10; i++) {
        let id = idReport[i];
        let response = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/${id}`);
        response = response.data;
        if (!response.doer) {
            response.doer = "Không xác định"
        }
        let report = {
            task_id: response._id,
            name: response.name || "Không xác định",
            doer: response.doer.name || "Không xác định",
            coDoers: response.coDoers.length == 0 ? "Không xác định" : response.coDoers.map(item => item.name),
            reviewer: response.reviewer.name || "Không xác định",
            creator: response.creator.name || "Không xác định",
            co_department: response.coDepartments.length == 0 ? "Không xác định" : response.coDepartments.map(item => item.name),
            start: response.start,
            finish: response.finish || "Không xác định",
            status: response.status,
            type: response.type
        }

        // post form
        try {
            await axios({
                method: 'POST',
                url: urlCreateReport + id,
                data: report,
                headers: env.headers
            });
        } catch (error) {
            return res.json({
                statusCode: 500
            });
        }
    };

    return res.json({
        statusCode: 200,
        idReport: idReport
    });
})


router.get('/statistic_report', [checkRole.hasUserId], async (req, res) => {
    res.render('statisticReport', { start: null, end: null, report: false })
})

router.post('/statistic_report', [checkRole.hasUserId], async (req, res) => {
    let { start, end } = req.body;

    let report = await generateReport(start, end, req);
    report = report[0];
    reportTask.addReportStatisticTask(report)
        .then(result => {
            res.render('statisticReport', { start, end, report })
        }).catch(err => {
            return res.json({ status_code: 500 })
        })

})

// router.get('/statistic_report_test', [checkRole.hasUserId], async (req, res) => {
//     res.render('statisticReportTest', { start: null, end: null, report: false })
// })
// router.post('/statistic_report_test', [checkRole.hasUserId], async (req, res) => {
//     let { start, end } = req.body;

//     let report = await generateReport(start, end, req);
//     report = report[0];
//     reportTask.addReportStatisticTask(report)
//         .then(result => {
//             res.render('statisticReportTest', { start, end, report })
//         }).catch(err => {
//             return res.json({ status_code: 500 })
//         })

// })


module.exports = router;