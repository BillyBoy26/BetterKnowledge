/**
 * Created by Denis on 29/05/2016.
 */
var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

router.get('/', function(req, res) {
    res.render('signup');
});


router.post('/createUser', function(req, res) {
    var userToCreate = {
        name : req.body.name,
        firstname : req.body.firstName,
        email: req.body.email,
        password: req.body.password
    };
    userModel.createUser(userToCreate);
    res.redirect('/');
});

module.exports = router;