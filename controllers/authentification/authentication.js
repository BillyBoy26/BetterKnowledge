var router = require('express').Router();


router.use("/facebook", require('./facebookAuth.js'));

router.get('/getConnectData', function(req, res) {
    res.contentType("json");
    res.send({
        isAuthenticated: req.isAuthenticated(),
        user :req.user
    });
});
module.exports = router;