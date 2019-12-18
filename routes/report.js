const axios = require('axios');
const express = require('express')

const checkRole = require('../helper/checkRole')
const env = require('../helper/environment')

const router = express.Router()


router.get('/all', [checkRole.hasUserId], async (req, res) => {
    let result = await axios.get(`${env.baseUrl_nhom3}/api/recurrent-tasks/`);
  
    let reports = result.data.filter(item => item.hasOwnProperty('doer') && item.doer.id == req.session.infoUser.user.userId);
  
    res.json(reports);
  });

module.exports = router;