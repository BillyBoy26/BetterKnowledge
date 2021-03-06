var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');
var ensureAuthentificated = require('../middleware/authentifcationUser');
var SHA256 = require("crypto-js/sha256");
var btoa = require('btoa');
var strUtils = require('../utils/StringUtils');

/* GET users listing. */
router.get('/',ensureAuthentificated, function(req, res) {
    var categoryId = req.query.catId;
    categoryModel.findById(categoryId, function(category){
        //embedParam pour Gruveo
        //TODO dans le tuto c'est dans le client  mais je pense qu c'est mieux de les mettre ici
        var generated = new Date();
        //TODO mettre une vrai cl��
        var secret = 'YOUR_API_KEY';
        var hash = SHA256(generated, secret);
        var signature = btoa(hash);

        category.name = strUtils.replaceAll(category.name, ' ', '');;

        res.render('knowledgeRoom', {
            generated: generated,
            signature:signature,
            category:category
        });

    });
});

module.exports = router;