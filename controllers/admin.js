var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('admin');
});


router.post('/category/add',function(req,res){
   var category = {
       name:req.body.categoryName,
       description :req.body.categoryDescription
   }
    categoryModel.add(category);
});

module.exports = router;