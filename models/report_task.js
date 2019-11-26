const q = require("q")
const { Pool, Client } = require('pg')
const { config } = require('../helper/config');
const pool = new Pool(config)
const client = new Client(config)
client.connect()

function getReportTask() {
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
    client.query('SELECT * FROM report.report_task WHERE id = $1',[id], (err, res) => {
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
    // let sql = `UPDATE report.report_task SET name = ${report.name}, user_id = ${report.user_id}, content = ${report.content}, status = ${report.status}, project_id = ${report.project_id}, department_id = ${report.department_id}, task_id = ${report.task_id}, updated_time = ${report.updated_time}, WHERE id = ${report.id}`
    client.query("UPDATE report.report_task SET name = $1, user_id = $2, content = $3, status = $4, project_id = $5, department_id = $6 , task_id = $7, updated_time = $8 WHERE id = $9", report, (err, res) => {
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
    client.query('DELETE FROM report.report_task WHERE id = $1', [id], (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })
    return defer.promise
}

function addReportTask(report) {
    let defer = q.defer()
    // let sql = "INSERT INTO report.report_task VALUES ($1, $2, $3, $4, $5, $6,$7, $8, $9)"
    client.query("INSERT INTO report.report_task VALUES ($1, $2, $3, $4, $5, $6,$7, $8, $9, $10)", report, (err, res) => {
        if (err) defer.reject(err)
        else defer.resolve(res)
    })
    return defer.promise
}

//project
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



module.exports = {
    getReportTask,
    addReportTask,
    getReportTaskById,
    updateReportTask,
    deleteReportTask,
    getReportByTypeId
}
