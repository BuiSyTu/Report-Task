const q = require("q")
const { Pool, Client } = require('pg')
const { config } = require('../helper/config');
const pool = new Pool(config)
const client = new Client(config)
client.connect()

const addLogSerice = log => {
    let defer = q.defer();
    let sql = `INSERT INTO report.log(id, actionUserId, type, reportId, status, createdTime, service) VALUES ('${uuid()}','${log.actionUserId}', '${log.type}', '${log.reportId}', '${log.status}', '${log.createdTime}', '${log.service}')`;

    console.log(sql);

    client.query(sql, (err, res) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(res);
        }
    })
    return defer.promise;

}

const getLogService = async (query) => {
    let { start, end } = query;


    let sql;
    if (start == null && end == null) {
        sql = `SELECT * FROM report.log`;
    } else {
        sql = `SELECT * FROM report.log WHERE createdTime >= '${start}' AND createdTime <= '${end}'`;
    }
    try {
        const { rows } = await client.query(sql);


        if (!rows[0]) {
            return { 'message': 'log service not found' };
        }
        return rows;
    } catch (error) {

    }
}

module.exports = {
    addLogSerice,
    getLogService
}