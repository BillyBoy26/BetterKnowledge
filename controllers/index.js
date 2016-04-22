var router = require('express').Router();


router.use('/',require('./accueil.js'));
router.use('/admin',require('./admin.js'));
router.use('/knowledgeRoom',require('./knowledgeRoom.js'));
router.use('/auth/facebook',require('./facebookAuth.js'));


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
router.get('/error', function(req, res){
    res.render('error');
});

module.exports = router;
