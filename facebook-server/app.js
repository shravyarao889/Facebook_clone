const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const AuthRoute = require('./routes/Auth');
const PostRoute = require('./routes/Post');
const UserRoute = require('./routes/User');
require('dotenv').config();

// init app 
const app = express();
// middlewares 
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({limit:"100mb"}));
app.use('/public/uploads' , express.static(__dirname + '/public/uploads'));

// all routes 
app.get('/' , (req , res) => res.send("You are connected succesfuly "))
const baseURL = '/api/v1'

app.use(`${baseURL}/auth` , AuthRoute);
app.use(`${baseURL}/post` , PostRoute);
app.use(`${baseURL}/user` , UserRoute);
//connection with database 
const Port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
        .then(() => app.listen(Port , () => console.log(`Server Runing on port ${Port}`)))
        .catch(err => console.log(err.message));