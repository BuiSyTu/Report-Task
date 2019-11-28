const q = require("q")
const { Pool, Client } = require('pg')
const { config } = require('../helper/config');
const pool = new Pool(config)
const client = new Client(config)
client.connect()

const uuid = require('uuid/v1');

function getAllReportTask() {
    let defer = q.defer()
    let query = client.query('SELECT * FROM report.report_task', (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })

    return defer.promise
}

function getReportTaskById(id) {
    let defer = q.defer()
    let sql = `SELECT * FROM report.report_task WHERE id = ${id}`
    client.query(sql, (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })
    return defer.promise
}

const updateReportTask = (report) => {
    let defer = q.defer()
    let sql = `UPDATE report.report_task SET name = '${report.name}', user_id = '${report.user_id}', content = '${report.content}', department_id = '${report.department_id}', task_id = '${report.task_id}', updated_time = '${report.updated_time.toISOString()}' WHERE id = '${report.id}'`
    client.query(sql, (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })

    return defer.promise
}

function deleteReportTask(id) {
    let defer = q.defer()
    let sql = `DELETE FROM report.report_task WHERE id = ${id}`
    client.query(sql, (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })
    return defer.promise
}

function addReportTask(report) {
    console.log(report);
    let defer = q.defer()
    let sql = `INSERT INTO report.report_task(id, name, user_id, content, created_time, department_id, task_id, updated_time) VALUES ('${report.id}','${report.name}', '${report.user_id}', '${report.content}',' ${report.created_time.toISOString()}', '${report.department_id}', '${report.task_id}', '${report.updated_time.toISOString()}')`
    console.log(sql);
    
    let query = client.query(sql, (err, res) => {
        if (err) defer.reject(err)
        else {
            defer.resolve(res);
        }
    })
    return defer.promise
}

const getReportByTypeId = (id, type) => {
    let defer = q.defer();
    let sql = `SELECT * from report.report_task WHERE ${type} = ${id}`;
    client.query(sql, (err, res) => {
        if (err) { defer.reject(err); }
        else {
            defer.resolve(res);
        }
    })
    return defer.promise;
}


const addLogSerice = log => {
    let defer = q.defer();
    let sql = `INSERT INTO report.log(id, method, path, payload, created_time) VALUES ('${uuid()}','${log.method}', '${log.path}', '${JSON.stringify(log.payload)}', '${log.created_at.toISOString()}')`;
    client.query(sql, (err, res) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(res);
        }
    })
    return defer.promise;

}

const getLogService = async () => {
    let sql = 'SELECT * FROM report.log';
    try {
        const { rows } = await client.query(sql);
        if (!rows[0]) {
            return { 'message': 'log service not found' };
        }
        return rows;
    } catch (error) {
        console.log(error);

    }
}



module.exports = {
    getAllReportTask,
    addReportTask,
    getReportTaskById,
    updateReportTask,
    deleteReportTask,
    getReportByTypeId,
    addLogSerice,
    getLogService
}
