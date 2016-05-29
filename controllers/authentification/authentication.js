var router = require('express').Router();
var userModel = require('../../models/userModel');


router.use("/facebook", require('./facebookAuth.js'));

router.use("/connection", function(req, res){
    var loginInfos = {email : req.query.email, password : req.query.password};
    userModel.findUser(loginInfos, function (user){
        console.log(user.name + '' + user.firstname);
    });
});


router.get('/getConnectData', function(req, res) {
    res.contentType("json");
    res.send({
        isAuthenticated: req.isAuthenticated(),
        user :req.user
    });
});
module.exports = router;