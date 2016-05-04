var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');
var multer = require('multer');
var strUtils = require('../utils/StringUtils');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/category')
    },
    filename: function (req, file, cb) {
        cb(null, 'cat_'+ Date.now()  + '_' + file.originalname)
    }
});

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function(req, res) {
    categoryModel.findAll(function(categoryList){
        res.render('admin',{
            categoryList:categoryList
        });
    });

});

router.post('/category/add',upload.single('categoryImage'),function(req,res){
    var fileName=null;
    if(req.file && req.file.path) {
        fileName = req.file.path.replace('public', '');
        fileName = strUtils.replaceAll(fileName, '\\','/');
        console.log(fileName);

    }
    var category = {
        name:req.body.categoryName,
        description :req.body.categoryDescription,
        imagePath:fileName
    }
    categoryModel.add(category);
    res.redirect('/admin');
});

router.post('/category/delete',function(req,res){
    var categoryId = req.body.catId;
    categoryModel.deleteById(categoryId);
    res.redirect('/admin');
});

module.exports = router;