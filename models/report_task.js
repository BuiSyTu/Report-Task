const q = require("q")
const { Pool, Client } = require('pg')
// const config = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'Fruits',
//     password: 'tu199712',
//     port: 5432
// }

var config = "postgres://witidczijjtnft:220ebe4c41a4e78db9b30207eaee20d0422f92038f958614a09ef9f2f030dbd6@ec2-174-129-231-100.compute-1.amazonaws.com:5432/d4h5vs51ghpb1q"
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
    client.query('SELECT * FROM report.report_task WHERE id = $1', [id], (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })
    return defer.promise
}

updateReportTask = (report) => {
    let defer = q.defer()
    console.log(report)
    let query = client.query("UPDATE report.report_task SET name = $1, user_id = $2, content = $3, status = $4, created_time = $5, project_id = $6, department_id = $7 , task_id = $8 WHERE id = $9", report, (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })
    console.log(typeof query);
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
    let sql = "INSERT INTO report.report_task VALUES ($1, $2, $3, $4, $5, $6,$7, $8, $9)"
    client.query(sql, report, (err, res) => {
        if (err) defer.reject(err)
        else defer.resolve(res)
    })
    return defer.promise
}

module.exports = {
    getReportTask,
    addReportTask,
    getReportTaskById,
    updateReportTask,
    deleteReportTask
}
