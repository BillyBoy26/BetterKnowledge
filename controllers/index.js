var router = require('express').Router();


router.use('/',require('./accueil.js'));
router.use('/accueil', require('./accueil.js'));
router.use('/admin',require('./admin.js'));
router.use('/knowledgeRoom',require('./knowledgeRoom.js'));
router.use('/auth',require('./authentification/authentication.js'));


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
