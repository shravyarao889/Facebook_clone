const express = require('express');
const { addComment, deleteComment } = require('../controllers/Comment');
const Like = require('../controllers/Like');
const { createPost, alluserPosts, DeletePost, EditPost, FollowingPosts } = require('../controllers/post');
const Auth = require('../middlewares/Auth');
const uploadOptions = require('../middlewares/uploads');

const PostRoute = express.Router();

//create new post 
PostRoute.post('/create' , Auth , uploadOptions.array('images' ,10)  , createPost);
//get all posts of user 
PostRoute.get('/all' , Auth, alluserPosts);
//delete user post 
PostRoute.delete('/delete/:postid' , Auth , DeletePost );
//update user post 
PostRoute.put('/edit/:postid' , Auth , EditPost);
// like on post 
PostRoute.put('/like/:postId' , Auth , Like);
// add comment 
PostRoute.post('/comment/add' , Auth , addComment);
//delete comment 
PostRoute.delete('/comment/delete/:commentId' , Auth , deleteComment);
//get following users posts 
PostRoute.get('/following' , Auth , FollowingPosts);

module.exports = PostRoute;