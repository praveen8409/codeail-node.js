const Post = require('../models/post');
const Comment = require('../models/comment');


// module.exports.create = function(req, res){
//     Post.create({
//         content : req.body.content,
//         user : req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('Error in creating a post :', err);
//             return;
//         }
//         return res.redirect('back');
//     });
// }

// we are changing into Async and Error Handling
module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        return res.redirect('back');

    } catch (error) {
        console.log('Error in creating a post :', error);
        return;
    }
}


// deleting the post

// module.exports.destroy = function(req, res){

//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post : req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


module.exports.destroy = async function(req, res){
    try {
        let post = await   Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

           await Comment.deleteMany({post : req.params.id});
           return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    } catch (error) {
        console.log('Error in creating a post :', error);
        return ;
    }
}
