const express = require('express')
const router = express.Router()

router.get('/sidebar1', (req, res) => {
    res.render('components/sidebar1');
})
router.get('/sidebar1_custom', (req, res) => {
    res.render('components/sidebar1_custom');
})

router.get('/sidebar2', (req, res) => {
    res.render('components/sidebar2');
})




module.exports = router;