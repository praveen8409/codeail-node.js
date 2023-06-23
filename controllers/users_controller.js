module.exports.profile = function(req, res){
    // return res.end('<h1>User Profile </h1>');

     // This is sending title value to user_profile.ejs file for home page
     return res.render('user_profile',{
        title : "Profile"
    });
}