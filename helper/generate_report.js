const reportTask = require('../models/report_task')
const moment = require('moment')
const axios = require('axios');
const env = require('../helper/environment');
const checkRole = require('../helper/checkRole');
const departmentApi = require('../otherApi/departmentApi');
const apiNhomHuy = require('../otherApi/apiNhomHuy');
const { createDate } = require('./convertStringToLocaleDate');
const generateReport = async (start, end, req) => {
    let result = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/`);

    let hasDoer = result.data.filter(item => item.hasOwnProperty('doer') && item.doer.id == req.session.infoUser.user.userId);

    if (hasDoer.length != 0) {
        start = createDate(start).getTime()
        end = createDate(end).getTime();

        hasDoer = hasDoer.filter(item => 
            (start <= new Date(item.start).getTime()) && (new Date(item.due).getTime() <= end));
        console.log(hasDoer);


    }
    return hasDoer;
}

module.exports = {
    generateReport
}