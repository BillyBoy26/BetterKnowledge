var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/category')
    },
    filename: function (req, file, cb) {
        cb(null, 'cat_'+ Date.now()  + '_' + file.originalname)
    }
});

var upload = multer({ storage: storage })

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
    var category = {
        name:req.body.categoryName,
        description :req.body.categoryDescription,
        imagePath:req.file.path
    }
    categoryModel.add(category);
});

module.exports = router;