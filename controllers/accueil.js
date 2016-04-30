var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');

/* GET users listing. */
router.get('/', function(req, res) {
  categoryModel.findAll(function(categoryList){
    res.render('accueil',{
      categoryList:categoryList
    });
  });
});

module.exports = router;
