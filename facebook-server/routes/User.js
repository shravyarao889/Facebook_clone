const express = require('express');
const { Follow } = require('../controllers/Follow');
const { UserInfo , ProfileInfo, allUsers, editUser } = require('../controllers/User');
const Auth = require('../middlewares/Auth');
const uploadOptions = require('../middlewares/uploads');

const UserRoute = express.Router();
// get all user 
UserRoute.get('/all' , Auth , allUsers);
// follow and unfollow users 
UserRoute.put('/follow/:followId' , Auth , Follow);
//get user profile data (signed user )
UserRoute.get('/profile' , Auth , ProfileInfo);
// get other user info 
UserRoute.get('/:userId' , Auth , UserInfo);
//edit user 
UserRoute.put('/edit' , Auth , uploadOptions.fields([{name:'profile_pic' , maxCount:1} , {name:'cover_pic' , maxCount:1}]) , editUser);

module.exports = UserRoute;