var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');
var loginMessage = "";

router.get('/', function(req, res) {
  loginMessage =  req.flash('error');
  res.render("accueil");
});

router.post("/getLoginMessage", function(req, res){
    res.contentType("json");
    res.send({loginMessage : loginMessage});
});

router.get('/category/findall', function(req, res) {
  categoryModel.findAll(function(categoryList){
    res.contentType("json");
    res.send(categoryList);
  });
});

module.exports = router;
