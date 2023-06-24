module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial</h1>');

    console.log(req.cookies);
    res.cookie('user_id',25); // set the cookie from server side 
    // This is sending title value to home.ejs file for home page
    return res.render('home',{
        title : "Home"
    });
}