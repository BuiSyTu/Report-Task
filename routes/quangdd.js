const express = require('express')
const router = express.Router()

const checkRole = require('../helper/checkRole');

router.get('/sidebar1', (req, res) => {
    res.render('components/sidebar1');
})
router.get('/sidebar1_custom', (req, res) => {
    res.render('components/sidebar1_custom');
})

router.get('/sidebar2', (req, res) => {
    res.render('components/sidebar2');
})

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



module.exports = router;