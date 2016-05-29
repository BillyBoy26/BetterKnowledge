//Define MySQL parameter in Config.js file.
var configFB          =     require('../configuration/configFB');
var query             = require('./connexionPostgres');
var userModel             = require('./userModel');
var passport          =     require('passport');
var FacebookStrategy  =     require('passport-facebook').Strategy;

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
        clientID: configFB.facebook_api_key,
        clientSecret:configFB.facebook_api_secret ,
        callbackURL: configFB.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            userModel.findUserById(profile.id, function (user) {
                if (user == undefined) {
                    console.log("There is no such user, adding now");
                    var userToCreate = {
                        id: profile.id,
                        name: profile.name.familyName,
                        fistname: profile.name.givenName,
                        email: profile.emails[0].value
                    };
                    userModel.createUserFromFB(userToCreate);
                }
                else {
                    console.log("User already exists in database");
                }
            });
            return done(null, profile);
        });
    }
));
module.exports= passport;
