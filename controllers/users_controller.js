module.exports.profile = function(req, res){
    // return res.end('<h1>User Profile </h1>');

     // This is sending title value to user_profile.ejs file for home page
     return res.render('user_profile',{
        title : "Profile"
    });
}

// render the signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title : 'codeial | signUp'
    });
}


// render the signIn page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title : 'codeial | signIn'
    });
}