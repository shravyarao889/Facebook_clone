import axios from "axios";
//get signed user profile info 
export const ProfileInfo = () => axios.get('user/profile');
//get user profile (other users )
export const UserProfile = (id) => axios.get(`user/profile/${id}`);
// get all users 
export const allUsers = () => axios.get('user/all');
// follow and unfollow user 
export const FollowUser = (userID) => axios.put(`user/follow/${userID}`);
//edit user data 
export const editUser = (data) => axios.put('user/edit' , data);