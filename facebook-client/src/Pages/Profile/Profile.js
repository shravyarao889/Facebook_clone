import { useState , useEffect, useContext } from 'react';
import {Box, Button , Grid, Typography  , ListItem , List , Container} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import './Profile.scss';
// import some icons from material ui
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ProfilePic from '../../Assets/images/profile.jpeg'
import AddIcon from '@material-ui/icons/Add';   
import EditIcon from '@material-ui/icons/Edit';
// import some components 
import Navbar from '../../Components/Navabr/Navbar';
import AddPost from '../../Components/AddPost/AddPost'
import CreatePost from '../../Components/CreatePost/CreatePost'
import UserInfo from '../../Components/UserInfo/UserInfo';
import Photos from '../../Components/Photos/Photos';
import Friends from '../../Components/Friends/Friends';
import Post from '../../Components/Post/Post'
import { editUser, ProfileInfo, UserProfile } from '../../Apis/User';
import { HanldleErr } from '../../Utils/Utils';
import { userPosts } from '../../Apis/Post';
import { AppContenxt } from '../../ContextApi/AppContext';
import Loading from '../../Assets/images/loading.gif'
const Profile = () => {
    const {PostGState , disptachPost , UserGState, dispatchUser} = useContext(AppContenxt);
    const{id} = useParams();
    const [createPost , setCreatePost] = useState(false);
    const [postData , setPostData] = useState({});
    window.onclick = () => {setCreatePost(false)}
    useEffect(() => {
        console.log(PostGState.userPosts)
        if(id){
            (async () => {
                await UserProfile(id).then(res => {
                    dispatchUser({type:"USER_INFO" , payload:res.data})
                }).catch(err => HanldleErr(err));
            })();
        }else{
            // check if user data stored in global strate or not 
            if (!PostGState.userPosts.length || !Object.keys(UserGState.info).length ){
                //get signed in user profile data
                (async() => {
                    try {
                        const [info , posts ] = await Promise.all([
                            ProfileInfo(),
                            userPosts()
                        ])
                        //store posts in global state 
                        disptachPost({type:"USER_POSTS" , payload:posts.data})
                        dispatchUser({type:"USER_INFO" , payload:info.data})
                    } catch (error) {
                        HanldleErr(error)
                    }
                })()
            }
        }
    },[]);
    //update profile info like profile pic and cover pic for now 
    const updateProfile = async (value , field) => {
        var formData = new FormData();
        formData.append(field , value);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        await editUser(formData , config).then(res => {
            dispatchUser({type:"USER_INFO" , payload:res.data})
        }).catch(err => HanldleErr(err))
    }

    if(Object.keys(UserGState.info).length ){
    return (
        <Box className='Profile'>
            {createPost&& <CreatePost Open = {setCreatePost} Data={postData} />}
            <Navbar />
            {/* cover section */}
            <Box className={`TopPart ${!UserGState.info.cover_pic &&"bg-white"}`} display='flex' alignItems='center' flexDirection='column'>
                <Box className={`CoverImage ${!UserGState.info.cover_pic &&"emptyImg"}`}>
                    {UserGState.info.cover_pic&&
                        <img src={UserGState.info.cover_pic} width='100%' height='350px' />
                    }
                    <input id='coverPhoto' type='file' hidden onChange={(e) => updateProfile( e.target.files[0] , 'cover_pic')}/>
                    <label htmlFor='coverPhoto'>
                        <CameraAltIcon /> <span className='text'> Edit Cover Photo</span>
                    </label>
                </Box>
            </Box>
            {/* Profile header section */}
            <Box className='ProfileTitle'>
                <Grid container>
                    <Grid xs={12} md={6}>
                        <Box className='leftSide' display='flex' alignItems='end'>
                            <Box className='profilePic'>
                                <img src={UserGState.info.profile_pic} alt="profilepic" width='168px' height='168px' />
                                <input type="file" hidden id='profile-Img' onChange={(e) => updateProfile( e.target.files[0] , 'profile_pic')}/>
                                <label htmlFor="profile-Img"> <CameraAltIcon /></label>
                            </Box>
                            <Box className='info'>
                                <Typography variant='h5'>{UserGState.info.username}</Typography>
                                <Typography variant="body1">{UserGState.info.followers&&UserGState.info.followers.length} friends</Typography>
                                <Box className='friendsPics'>
                                    <img src="https://cdn.pixabay.com/photo/2018/11/22/08/05/thor-3831290__340.png" alt="frineds Pic" width="32px" height='32px' />
                                    <img src="https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662__340.jpg" alt="frineds Pic" width="32px" height='32px' />
                                    <img src="https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332__340.jpg" alt="frineds Pic" width="32px" height='32px' />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box display='flex' className='BTNs' justifyContent='end'>
                            <Button variant='contained'> <AddIcon /> Add Story</Button>
                            <Button variant='contained'> <EditIcon /> Edit profile</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* Navigation section  */}
            <Box className='Naviagation'>
                <List>
                    <ListItem button className='active'>Posts</ListItem>
                    <ListItem button>About</ListItem>
                    <ListItem button>Friends </ListItem>
                    <ListItem button>Photos</ListItem>
                </List>
            </Box>
            {/* Post section  */}
            <Box className='PostsSection'>
                <Container maxWidth='md'>
                    <Grid container >
                        <Grid xs={12} md={5}>
                            <Box className='LeftSide'>
                                <UserInfo />
                                <Photos />
                                <Friends />
                            </Box>
                        </Grid>
                        <Grid xs={12} md={7}>
                            <AddPost OpenCreatePost = {setCreatePost} />
                            {PostGState.userPosts.map(post  => (
                                <Post key={post._id} data={post} OpenCreatePost = {setCreatePost} setPostData={setPostData} />
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
    }else{
        return <img src={Loading} alt='please wait' className='loading' />
    }
}

export default Profile;
