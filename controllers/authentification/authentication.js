var router = require('express').Router();


router.use("/facebook", require('./facebookAuth.js'));


module.exports = router;