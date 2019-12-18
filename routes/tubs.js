const express = require('express')
const router = express.Router()

router.get('/array', (req, res, next) => {
    arr = [1, 2, 3]
    res.json(arr)
})

router.get('/arraytotext', (req, res, next) => {
    arr = [1, 2, 3]
    res.json(arr.toString())
})

router.get('/texttoarray', (req, res, next) => {
    txt = "1, 2, 3"
    txt = '[' + txt + ']'
    res.json(JSON.parse(txt))
})



module.exports = router;