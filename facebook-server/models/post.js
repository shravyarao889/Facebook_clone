const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    images:[
        {
            type:String
        }
    ],
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    lang:{
        type:String,
        required:true,
        default:"EN"
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
});


module.exports = mongoose.model('post' , postSchema);