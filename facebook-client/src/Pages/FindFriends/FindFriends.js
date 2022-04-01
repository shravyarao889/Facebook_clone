import { useContext, useEffect, useState } from 'react';
import {Box, Grid , Container, Typography, Button } from '@material-ui/core'
import Navbar from '../../Components/Navabr/Navbar'
import './FindFriend.scss';
import { allUsers, FollowUser } from '../../Apis/User';
import Loading from '../../Assets/images/loading.gif'
import { HanldleErr } from '../../Utils/Utils';
import { AppContenxt } from '../../ContextApi/AppContext';
const  FindFriends = () => {
    const {UserGState , dispatchUser} = useContext(AppContenxt);
    const [users , setUsers ] = useState({});
    // to get all users 
    useEffect(()=>{
        (async()=>{
            await allUsers().then(res => {
                setUsers(res.data)
            }).catch(err => {
                HanldleErr(err)
            })
        })()
    },[]);

    // follow user (add friend )
    const AddFriend = async (userID) => {
        await FollowUser(userID).then(res => {
            dispatchUser({type:"USER_INFO" , payload:res.data})
        }).catch(Err => {
            HanldleErr(Err)
        })
    }

    if(Array.isArray(users)){
    return (
    <Box className='findFreinds'>
        <Navbar />
        <Container>
            <Box className='FriendsContainer'>
                <Typography variant='h5'>Find Friends </Typography>
                <Grid container spacing={1}>
                    {users.length&&users.map(user => (
                        <Grid item xs={4} md={2}>
                            <Box className='friend' display='flex' flexDirection='column' >
                                <img src={user.profile_pic} width='209px' height="209px" alt='friend name' />
                                <Box className='info'>
                                    <Typography variant="body2">{user.username}</Typography>
                                    <Button fullWidth variant='contained' color='primary' className={UserGState.info.following&&UserGState.info.following.includes(user._id)&&"unfollow"} onClick={() => AddFriend(user._id)}>
                                        {UserGState.info.following&&UserGState.info.following&&UserGState.info.following.includes(user._id) ? "UnFriend" : "+Add Friend"}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    </Box>
    )}else{
        return <img src={Loading} alt='please wait' className='loading' />
    }
}

export default FindFriends