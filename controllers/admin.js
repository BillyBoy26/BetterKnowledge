var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');
var multer = require('multer');
var path = require('path');
var upload = multer({dest : path.join(__dirname,'/../upload/category/')});

/* GET users listing. */
router.get('/', function(req, res) {
    //res.render('admin');
    categoryModel.findAll(function(categoryList){
        res.render('admin',{
            categoryList:categoryList
        });
    });

});

router.post('/category/add',upload.single('categoryImage'),function(req,res){
    console.log(req.file);
    console.log(req.files);
    var category = {
        name:req.body.categoryName,
        description :req.body.categoryDescription
    }
    categoryModel.add(category);
    res.redirect('/admin');
});

module.exports = router;