const axios = require('axios');
const env = require('../helper/environment');
const { createDate } = require('./convertStringToLocaleDate');

const generateReport = async (start, end, req) => {
    let result = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/`);

    let hasDoer = result.data.filter(item => item.hasOwnProperty('doer') && item.doer.id == req.session.infoUser.user.userId);

    // console.log(111, hasDoer.length);

    if (hasDoer.length != 0) {
        start = createDate(start).getTime()
        end = createDate(end).getTime();

        hasDoer = hasDoer.filter(item => (start <= new Date(item.start).getTime()) && (new Date(item.due).getTime() <= end));
        // console.log(222, hasDoer1);
    }
    return hasDoer;
}

module.exports = {
    generateReport
}