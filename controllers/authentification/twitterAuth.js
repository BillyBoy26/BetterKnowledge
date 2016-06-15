var router = require('express').Router();
var connexionTwitter = require('../../models/connexionTwitter.js');



//Passport Router
router.get('/', connexionTwitter.authenticate('twitter'));
router.get('/callback',
		connexionTwitter.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect: '/'
    }));



module.exports = router;