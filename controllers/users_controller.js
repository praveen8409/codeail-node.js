const User = require('../models/user');


module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile </h1>');

    // This is sending title value to user_profile.ejs file for home page
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "Profile",
            profile_user : user
        });
    });
   
}

// render the signUp page
module.exports.signUp = function (req, res) {

    //  if user already signed in but they want to sign up again without logout then they redirect back to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: 'codeial | signUp'
    });
}


// render the signIn page
module.exports.signIn = function (req, res) {

    //  if user already signed in but they want to sign up again without logout then they redirect back to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    return res.redirect('/');
}

// This is for Sign-Out 
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
      if (err) {
        console.log(err);
      }
      return res.redirect('/users/sign-up');
    });
  }


  
  