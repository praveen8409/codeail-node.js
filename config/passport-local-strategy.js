const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const cookieParser = require('cookie-parser');

// Authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // find a user abd establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                // console.log('Error is finding User --> passport');
                req.flash('erorr', err);

                return done(err);
            }
            if (!user || user.password != password) {
                // console.log('Invalid UserName / Password');
                req.flash('error','Invalid UserName / Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to kept in the function
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in cookie

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error is finding User --> passport');
            return done(err);
        }
        return done(null, user);

    });
});

// Check if the user is authenticated 
passport.checkAuthentication = function(req, res, next){

    // if the user is signed in, then pass on the request to the next function(controller's qction)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookies and we are just sending this to the local views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;