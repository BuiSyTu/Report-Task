const axios = require('axios');
const env = require('../helper/environment');


module.exports = {
    getIdToCreateReport: async () =>{
        let recurrent_task = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/statistics`);
        let idReport = recurrent_task.data.all.tasks.map(item=>item._id);
        // console.log('idReport: ', idReport);
        return idReport;
    }
}