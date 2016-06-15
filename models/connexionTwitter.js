var configTwitter          =     require('../configuration/configTwitter');
var userModel             = require('./userModel');
var passport          =     require('passport');
var TwitterStrategy  =     require('passport-twitter').Strategy;


// Use the TwitterStrategy within Passport.
passport.use(new TwitterStrategy({
		consumerKey: configTwitter.twitter_api_key,
		consumerSecret:configTwitter.twitter_api_secret ,
        callbackURL: configTwitter.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        userModel.findUserById(profile.id, function (user) {
            if (user == undefined) {
                console.log("There is no such user, adding now");
                var userToCreate = {
                    id: profile.id,
                    name: profile.name.familyName,
                    fistname: profile.name.givenName,
                    email: profile.emails[0].value
                };
                userModel.createUserFromOauth(userToCreate);
            }
            else {
                console.log("User already exists in database");
            }
        });
        return done(null, profile);
    }
));
module.exports= passport;
