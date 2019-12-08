// const env = require('../helper/environment');

const hasUserId = (req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    // console.log(req.session.infoUser);
    if (req.session.infoUser) {
        next();
    } else {
        req.session.validUrl = fullUrl;
        res.redirect('/view/login');
    }

}

module.exports = { hasUserId }