const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toogleLike = async function(req, res){
    try {
        
        // likes/toggle/?id=abcd=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('like');
        }

        // check if a like already exists

        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        });

        //if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike.like._id);
            like.save();

            existingLike.remove();
            deleted : true;
        }else{
            // else make a new like
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();
        }

        return res.join(200, {
            message : "Remove successfull",
            data : {
                deleted : deleted
            }
        })
    } catch (error) {
        console.log(err);
        return res.join(500, {
            message : 'Internal server error'
        });
    }
}
