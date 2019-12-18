const reportTask = require('../models/report_task')
const moment = require('moment')
const axios = require('axios');
const env = require('../helper/environment');
const checkRole = require('../helper/checkRole');
const departmentApi = require('../otherApi/departmentApi');
const apiNhomHuy = require('../otherApi/apiNhomHuy');
const { createDate } = require('./convertStringToLocaleDate');
const { genLocaleDate } = require('./convertStringToLocaleDate');
const uuid = require('uuid/v1');

const generateReport = async (start, end, req) => {
    let result = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/`);

    let hasDoer = result.data.filter(item => item.hasOwnProperty('doer') && item.doer.id == req.session.infoUser.user.userId);

    if (hasDoer.length != 0) {
        startTime = createDate(start).getTime()
        endTime = createDate(end).getTime();

        hasDoer = hasDoer.filter(item => (startTime <= new Date(item.start).getTime()) && (new Date(item.due).getTime() <= endTime));
        hasDoer = [{
            id: uuid(),
            name: req.body.report_name,
            start: start,
            end: end,
            finished_task: hasDoer.filter(item=>item.status =="finished").length,
            overdue_task: hasDoer.filter(item=>item.status =="overdue").length,
            doing_task: hasDoer.filter(item=>item.status =="doing").length,
            cancel_task: hasDoer.filter(item=>item.status =="canceled").length,
            created_time: genLocaleDate(new Date()).toISOString(),
            share: [],
            creator_id: req.session.infoUser.user.userId,
            creator_name: req.session.infoUser.user.name,
            description: req.body.description
        }]
    }
    return hasDoer;
}

module.exports = {
    generateReport
}