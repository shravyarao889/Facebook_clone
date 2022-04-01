const Comment = require('../models/comment');
const Post = require('../models/post')
// add nwe comment 
const addComment = async (req , res) => {
    try {
        const{comment , postId} = req.body;
        if(!comment) return res.status(403).json({message:"Please add some content !!"});
        //creaete new commnet 
        const newComment =  new Comment({comment , user:req.user._id , post:postId});

        if(!newComment) return res.status(500).json({message:"somthign went wrong !!"});
        //save comment 
        await newComment.save();
        // find post and update
        let getPost = await Post.findByIdAndUpdate(postId , {$push:{comments:newComment._id}},{new:true})
        if(!getPost) return res.status(404).json({message:"Post not found"});
        return res.status(200).json(await newComment.populate('user' , "username profile_pic"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

//delete comment 
const deleteComment = async(req ,res) => {
    try {
        const {commentId} = req.params;
        const getComment = await Comment.findById(commentId);
        if(!getComment) return res.status(404).json({message:"comment not found "});
        //check if this comment belong to signed user or not 
        if(getComment.user.toString() === req.user._id.toString()){
            //remove comment 
            await getComment.remove();
            return res.status(200).json({message:'comment Delete Successfully'})
        }else{
            return res.status(403).json({message:"this is not your comment !!!"})
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = {
    addComment,
    deleteComment
}