const user = require('../models/user');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();


//create new account 
// email extions 
const EmailEX = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com"
]
const Signup = async (req , res ) => {
    try {
        const {username , surname , email , password , day , month , year} = req.body;
        // check if user enterd required data or not 
        if(!username || !surname || !email || !password  || !day || !month || !year){
            return res.status(403).json({message:"All fields required!!"});
        }
        // check email validation 
        if(!EmailEX.some(emailex => email.includes(emailex) )){
            return res.status(400).json({message:"Please Enter Valied Email !!"});
        }

        //check email reqgister before or not 
        const findEmail = await user.findOne({email})
        if(findEmail){
            return res.status(400).json({message:"This email already registed !!"})
        }

        // hash bassword 
        const hashpass = bcrypt.hashSync(password , 10);
        // create new user 
        let newUser = new user({...req.body , password:hashpass});
        newUser = await newUser.save();

        // check if user created or not 
        if(!newUser) return res.status(500).json({message:"somethign went wrong "});
        return res.status(200).json({message:"Account created Successfully"});

    } catch (error) {
        return res.status(403).json({message:error})
    }
}


//Login 
const Login = async ( req , res) => {
    try {
        const {email , password } = req.body;
        //check if user entered password and email or not 
        if(!email || !password) return res.status(403).json({message:"Email and password required "});
        //get user from database
        const finduser = await user.findOne({email});
        // check user and password 
        if(finduser && bcrypt.compareSync(password , finduser.password)){
            const token = JWT.sign({userId:finduser._id } , process.env.SECRET_KEY , {expiresIn:'1d'});
            return res.status(200).json({ username:finduser.username, surname:finduser.surname , token , _id:finduser._id , profile_pic:finduser.profile_pic})
        }
        return res.status(400).json({message:"Invalied Email or Password "})
    } catch (error) {
        return res.status(403).json({message:error.message})
    }
}

module.exports ={
    Signup,
    Login
}