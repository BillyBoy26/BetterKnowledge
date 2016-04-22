var express = require('express');
var router = express.Router();
var ensureAuthentificated = require('../middleware/authentifcationUser');
var SHA256 = require("crypto-js/sha256");
var btoa = require('btoa');

/* GET users listing. */
router.get('/',ensureAuthentificated, function(req, res) {
    //embedParam pour Gruveo
    //TODO dans le tuto c'est dans le client  mais je pense qu c'est mieux de les mettre ici
    var generated = new Date();
    //TODO mettre une vrai cl��
    var secret = 'YOUR_API_KEY';
    var hash = SHA256(generated, secret);
    var signature = btoa(hash);

    res.render('knowledgeRoom', {
        user: req.user,
        generated: generated,
        signature:signature
    });
});

module.exports = router;