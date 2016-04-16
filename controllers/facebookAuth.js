var router = require('express').Router();
var connexionFB = require('../models/connexionFB.js');



//Passport Router
router.get('/', connexionFB.authenticate('facebook'));
router.get('/callback',
    connexionFB.authenticate('facebook', {
        successRedirect : '/logged',
        failureRedirect: '/error'
    }),
    function(req, res) {
        res.redirect('/logged');
    });



module.exports = router;