const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile </h1>');

    // This is sending title value to user_profile.ejs file for home page
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        });
    });

}

// update user details
module.exports.update = async function (req, res) {
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }


    if (req.user.id == req.params.id) {
        try {
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("----Multer Erroro-----");
                    return;
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '\\' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}
// render the signUp page
module.exports.signUp = function (req, res) {

    //  if user already signed in but they want to sign up again without logout then they redirect back to profile page
    if (req.isAuthenticated()) {
        req.flash('success', 'Signed Up  Successfully');
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: 'codeial | signUp'
    });
}


// render the signIn page
module.exports.signIn = function (req, res) {

    //  if user already signed in but they want to sign up again without logout then they redirect back to profile page
    if (req.isAuthenticated()) {
        req.flash('success', 'Logged in Successfully');
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'codeial | signIn'
    });
}

//  get the sign up data  ( npm i mongoose@6.7.3)
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            // console.log('Error in finding user in signing Up');
            req.flash('error', err);
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    // console.log('Error is creating while user signing Up');
                    req.flash('error', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
}

//  sign in and create session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

// This is for Sign-Out 
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        req.flash('success', 'You have logged out');

        return res.redirect('/users/sign-up');
    });
}



