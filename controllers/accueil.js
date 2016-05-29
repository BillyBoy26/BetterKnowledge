var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('accueil');
});

router.get('/category/findall', function(req, res) {
  categoryModel.findAll(function(categoryList){
    res.contentType("json");
    res.send(categoryList);
  });
});

module.exports = router;
