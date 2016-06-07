var router = require('express').Router();
var connexionBK = require('../../models/connexionBK.js');



//Passport Router
router.get('/', connexionBK.authenticate('local', { successRedirect: '/',
        failureRedirect: '/'
    })
);



module.exports = router;