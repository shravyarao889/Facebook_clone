import axios from "axios";

// create new post 
export const AddNewPost = (data) => axios.post('post/create' , data); 
//get user posts 
export const userPosts = () => axios.get('post/all' , {headers:{Authorization:`Bearer ${localStorage.getItem('AccessToken')}`}})
// add comment 
export const addComment = (data) => axios.post(`post/comment/add` , data);
// like and unlike 
export const Like = (postId) => axios.put(`/post/like/${postId}`)
//delete post 
export const DeletePost = (postID) => axios.delete(`post/delete/${postID}`);
//edit post 
export const EditPost = (postID, data) => axios.put(`post/edit/${postID}` , data);
// get all following posts 
export const FollowingPosts = () => axios.get('post/following',{headers:{Authorization:`Bearer ${localStorage.getItem('AccessToken')}`}})