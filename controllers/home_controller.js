module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial</h1>');


    // This is sending title value to home.ejs file for home page
    return res.render('home',{
        title : "Home"
    });
}