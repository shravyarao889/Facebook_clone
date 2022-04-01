const Post = require('../models/post');

// like and unlike posts controller 
const Like = async (req , res ) => {
    try {
        const {postId} = req.params;
        // get post 
        var getPost = await Post.findById(postId);
        if(!getPost) return res.status(404).json("Post not found !!")
        // check if user liked on this post before or not
        if(getPost.like.includes(req.user._id)){
            getPost = await Post.findByIdAndUpdate(postId , {$pull:{like:req.user._id}} , {new:true}) 
        }else{
            getPost = await Post.findByIdAndUpdate(postId , {$push:{like:req.user._id}} , {new:true}) 
        }
        // return the post witj new likes 
        return res.status(200).json(await getPost.populate('user' , "username profile_pic"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = Like;