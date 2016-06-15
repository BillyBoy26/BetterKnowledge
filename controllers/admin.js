var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');
var multer = require('multer');
var strUtils = require('../utils/StringUtils');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/category');
    },
    filename: function (req, file, cb) {
        cb(null, 'cat_'+ Date.now()  + '_' + file.originalname);
    }
});

var upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('admin');
});

router.get('/category/findall', function(req, res) {
    categoryModel.findAll(function(categoryList){
        res.contentType("json");
        res.send(categoryList);
    });
});

router.post('/category/add',upload.single('categoryImage'),function(req,res){
	console.log("AJOUT D'UNE CATEGIRY");
    var category = buildCategory(req);
    categoryModel.add(category);
});

router.post('/category/update',upload.single('categoryImage'),function(req,res){

    var category = buildCategory(req);
    categoryModel.update(category);
});



router.post('/category/delete',function(req,res){
    var categoryId = req.body.catId;
    categoryModel.deleteById(categoryId);
});

function buildCategory(req) {
	  console.log("CONSTRUCTION DUNE CATEGORY");
    var fileName = null;
    if (req.file && req.file.path) {
        //TODO il dot y avoir moyen de faire mieux que ca
        fileName = req.file.path.replace('public', '');
        fileName = strUtils.replaceAll(fileName, '\\', '/');
        console.log(fileName);
    }
    var category = {
        name: req.body.categoryName,
        description: req.body.categoryDescription,
        imagePath: fileName,
        id : req.body.catId
    };
    return category;
}

module.exports = router;