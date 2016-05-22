var router = require('express').Router();
var connexionFB = require('../models/connexionFB.js');



//Passport Router
router.get('/', connexionFB.authenticate('facebook'));
router.get('/callback',
    connexionFB.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/');
    });



module.exports = router;