var configGoogle          =     require('../configuration/configGoogle');
var userModel             = require('./userModel');
var passport          =     require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// Use the TwitterStrategy within Passport.
passport.use(new GoogleStrategy({
		clientID: configGoogle.google_api_key,
		clientSecret:configGoogle.google_api_secret ,
        callbackURL: configGoogle.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        userModel.findUserById(profile.id, function (user) {
            if (user == undefined) {
                console.log("There is no such user, adding now");
                var userToCreate = {
                    id: profile.id,
                    name: profile.name.familyName,
                    firstname: profile.name.givenName,
                    email : '',
                    profilPicture : profile.photos[0].value,
                    provider: profile.provider
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
