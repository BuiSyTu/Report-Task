const hasUserId = (req, res, next) => {

    console.log(req.session.infoUser);
    if (req.session.infoUser) {
        
        next();
    } else {
        res.redirect('/view/login');
    }

}

module.exports = { hasUserId }