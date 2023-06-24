const User = require('../models/user');

module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile </h1>');

    // This is sending title value to user_profile.ejs file for home page
    return res.render('user_profile', {
        title: "Profile"
    });
}

// render the signUp page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'codeial | signUp'
    });
}


// render the signIn page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'codeial | signIn'
    });
}

//  get the sign up data  ( npm i mongoose@6.7.3)
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in signing Up');
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error is creating while user signing Up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    });
}

//  sign in and create session for the user
module.exports.createSession = function (req, res) {
    // Todo leter
}