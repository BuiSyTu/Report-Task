const hasUserId = (req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("fullUrl", fullUrl);

    if (req.session.infoUser) {
        console.log('req.session.infoUser: ', req.session.infoUser);
        next();
    } else {
        req.session.validUrl = fullUrl;
        res.redirect('/view/login');
    }

}

module.exports = { hasUserId }