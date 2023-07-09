const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tells passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "472059763624-35norpk29vhgjkkb2evsicfs3v92n3v7.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email : profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('Error in google strategy-passport', err);
            return;
        }

        console.log(profile);

        if(user){
            // if found, set this user as req.user
            return done(null, user);
        }else{
            // if not found, create the user and  set it as req.user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('Error in creating user google strategy-passport', err);
                    return;
                }

                return done(null, user);
            });
        }
    });
}));

module.exports = passport;