var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/userModel');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'},
    function(email, password, done) {
        var loginInfos = {email : email, password : password};
        userModel.findUser(loginInfos, function (user){
            if (!user) {
                return done(null, false, { message: 'Email address or password are incorrect' });
            }
            return done(null, user);
        });
    }

));
module.exports= passport;