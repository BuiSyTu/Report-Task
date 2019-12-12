<<<<<<< HEAD
const hasUserId = (req, res, next) => {
    console.log(req.session);
=======
// const env = require('../helper/environment');

const hasUserId = (req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("fullUrl", fullUrl);
    
    
    // console.log(req.session.infoUser);
>>>>>>> db2cfa8cdfa6d206355ee3ae8e5fb23dc10cb373
    if (req.session.infoUser) {
        next();
    } else {
        req.session.validUrl = fullUrl;
        res.redirect('/view/login');
    }

}

module.exports = { hasUserId }