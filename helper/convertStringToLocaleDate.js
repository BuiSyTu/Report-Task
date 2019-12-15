const moment = require('moment');

const createDate = date => {
    date = moment(date, "DD/MM/YYYY HH:mm:ss").toDate();
    date.setHours(date.getHours() + 7);
    return date;
}

module.exports = {
    createDate
}