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


        if(req.xhr){
            post = await post.populate('user');
            return res.status(200).json({
                data : {
                    post : post
                },
                message : "Post created!"
            });
        }

        req.flash('success','Post published');
        return res.redirect('back');

    } catch (error) {
        // console.log('Error in creating a post :', error);
        req.flash('error',error);

        return res.redirect('back');

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

           if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.params.id
                },
                message : "Post Deleted"
            });
           }

        req.flash('success','Post and associated comments deleted');
           return res.redirect('back');
        }else{
        req.flash('error','You can not delete this post');
            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
}
