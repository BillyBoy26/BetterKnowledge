var express = require('express');
var router = express.Router();
var categoryModel = require('../models/categoryModel');

/* GET users listing. */
router.get('/', function(req, res) {
  categoryModel.findAll(function(categoryList){
    res.render('accueil',{
      categoryList:categoryList,
      isAuthenticated: req.isAuthenticated(),
      user :req.user

    });
  });
});

router.post('/launchDiscussion',function(req,res){
  var categoryId = req.body.catId;
  res.redirect('/knowledgeRoom', categoryId);
});


module.exports = router;
