var axios = require('axios');
var env = require('../helper/environment');
module.exports = {
    getDepartmentById: async id => {
        // console.log(`${env.baseUrl_nhom15}/Departments/${id}`);
        try {
            let departInfo = await axios.get(`${env.baseUrl_nhom15}/Departments/${id}`);
            return departInfo.data;
        } catch (error) {
            return { depart_name: "Không xác định" };
        }

    }
}