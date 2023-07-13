const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function (req, res) {
//     // return res.end('<h1>Express is up for Codeial</h1>');

//     console.log(req.cookies);
//     res.cookie('user_id', 25); // set the cookie from server side 
//     // This is sending title value to home.ejs file for home page

//     //    Post.find({}, function(err, posts){
//     //     return res.render('home',{
//     //         title : "Home",
//     //         posts : posts
//     //     });
//     //    });

//     //populate the user for each post
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })
//         .exec(function (err, posts) {
//             User.find({}, function(err, users){
//                 return res.render('home', {
//                     title: "Home",
//                     posts: posts,
//                     all_users : users
//                 });
//             })
           
//         });
// }

// we are using async Await + Error Handling

module.exports.home = async function (req, res){
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users : users
        });
    } catch (error) {
        console.log('ERROR', error);
        return;
    }
}