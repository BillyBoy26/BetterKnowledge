var router = require('express').Router();
var connexionGoogle = require('../../models/connexionGoogle.js');



//Passport Router
router.get('/', connexionGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/callback', 
	connexionGoogle.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });



module.exports = router;