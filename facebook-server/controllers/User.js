const User = require('../models/user');
const Cloudinary  = require('../middlewares/Cloudinary')
//get other user Info
const UserInfo = async (req ,res ) => {
    try {
        // get user by params of id (other users on platform)
        const getUser = await User.findById(req.params.userId).select('-password');
        if(!getUser ) return res.status(404).json({message:"user not found!!"});
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

// get user profile (signed user)
const ProfileInfo = async (req , res) => {
    try {
        // get signed user 
        const SignedUser = await User.findById(req.user._id).select('-password').populate("followers","profile_pic username");
        if(!SignedUser ) return res.status(404).json({message:"user not found!!"});
        return res.status(200).json(SignedUser);

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

// get all users 
const allUsers = async (req , res) => {
    try {
        const findUsers = await User.find({}).select('profile_pic username followers');
        if(!findUsers) return res.status(500).json({message:"somthing went wrong !!"});
        //return users without signed user 
        return res.status(200).json(findUsers.filter(user => user._id.toString() !== req.user._id.toString()));
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//edit user data ()
const editUser = async (req ,res) =>{
    try {
        //check if user wanna edit images like profile pic or not 
        if(Object.keys(req.files).length){
            // upload images to cloudinary  then store url which returned from cloudinary after upload 
            var ImgObj = {}
            for(let key in req.files){
                const Img_Url = await Cloudinary.uploader.upload(req.files[key][0].path);
                ImgObj = {...ImgObj , [key]:Img_Url.url , public_id:Img_Url.public_id}
            } 
        } 

        //get user and update data 
        const getUser = await User.findByIdAndUpdate(req.user._id , {
            ...req.body ,
            ...ImgObj
            // profile_pic:req.files.profile_pic&&`${req.protocol}://${req.get("host")}/public/uploads/${req.files.profile_pic[0].filename}`,
            // cover_pic:req.files.cover_pic&&`${req.protocol}://${req.get("host")}/public/uploads/${req.files.cover_pic[0].filename}`
        } , {new:true});
        //check if user exist 
        if(!getUser) return res.status(404).json({message:"user not found !!"});
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    UserInfo,
    ProfileInfo,
    allUsers,
    editUser
}