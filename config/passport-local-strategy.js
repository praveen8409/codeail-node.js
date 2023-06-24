const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const cookieParser = require('cookie-parser');

// Authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user abd establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error is finding User --> passport');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('Invalid UserName / Password');
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

module.exports = passport;