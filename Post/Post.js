import { useContext, useState } from 'react';
import {Box , ListItem , List, Typography , Button , Menu , MenuItem } from '@material-ui/core'
// icons from materal ui
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';
import './Post.scss';
import { addComment, DeletePost, Like } from '../../Apis/Post';
import { AppContenxt } from '../../ContextApi/AppContext';
import { HanldleErr } from '../../Utils/Utils';

const Post = ({data , OpenCreatePost , setPostData}) => {
    const {disptachPost , UserGState} = useContext(AppContenxt);
    const [lang , setLang] = useState('EN'); // for direction when write comment 
    const [comment , setComment] = useState({comment:""}); // store new comment 
    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // check input character if arabic or not and will store data in state 
    const addContent = (value ) => {
        let arabic = /[\u0600-\u06FF]/;
        setLang(arabic.test(value) ? "AR" : "EN");
        setComment({...comment , comment:value , postId:data._id})
    }
    // submit new comment 
    const submitComment = async (e) => {
        e.preventDefault();
        await addComment(comment).then(res => {
            disptachPost({type:"ADD_COMMENT" , payload:res.data});
            setComment({...comment , comment:""})
            
        }).catch(err => {
            HanldleErr(err);
        })
    }
    // like post 
    const likePost = async() => {
        await Like(data._id).then(Res => {
            disptachPost({type:"LIKE_POST" , payload:Res.data});
        }).catch(err =>{
            HanldleErr(err);
        });
    }
    // convert format date 
    const DateFormat = (date) => {
        let newDate = new Date(date);
        return `${newDate.getDate()} ${Months[newDate.getMonth()]} ${newDate.getFullYear()} `
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Delete Post 
    const RemovePost = async () => {
        await DeletePost(data._id).then(res => {
            disptachPost({type:"DELETE_POST" , payload:data._id})
        }).catch(err => console.log(err.response.data));
    }
    //edit post function 
    const editPost = (e) => {
        e.stopPropagation();
        handleClose() ;
        OpenCreatePost(true) ;
        setPostData(data)
    }
    return(
        <Box className='Post'>
            <Box className='Header' display='flex' justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" >
                    <img src={data.user.profile_pic} alt="profilePic"  width="40px" height="40px"  />
                    <Box className='title'>
                        <Typography variant='body2'>{data.user.username}</Typography>
                        <Typography variant="caption"> {DateFormat(data.createdAt)} </Typography>
                    </Box>
                </Box>
                <div>
                    <MoreHorizIcon onClick={handleClick} />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={editPost}>Edit Post </MenuItem>
                        <MenuItem onClick={() => { handleClose() ;RemovePost()}}>Delete Post</MenuItem>
                    </Menu>
                </div>
            </Box>
            <Box className='Description' marginTop="15px">
                <Typography variant='body2' align={data.lang === 'AR' ? "right" : "left"}>
                    {data.content}
                </Typography>
                {data.images.length > 0 &&data.images.map(img => (
                    <img src={img} alt='postImage' width='100%' />
                ))}
            </Box>
            <Box className='Reactions' display='flex' justifyContent="space-between">
                <Box display='flex' className='emoji'>
                    <Box className="like" display='flex' justifyContent='center' alignItems='center'>
                        <img width="18px" height="18px" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" alt="" />
                        <Typography className='caption' variant='caption'>{data.like.length}</Typography>
                    </Box>
                </Box>
                <Box className='NumComments'>
                    <Typography variant='caption'>{data.comments.length}</Typography>
                    <Typography variant='caption'>Comments</Typography>
                </Box>
            </Box>
            <Box className='Actions'>
                <List disablePadding> 
                    <ListItem button onClick={likePost} className={data.like.includes(UserGState.info._id) && "activeLike"}> {data.like.includes(UserGState.info._id) ? <ThumbUpAltIcon/> : <ThumbUpAltOutlinedIcon />}  Like</ListItem>
                    <ListItem button> <label htmlFor='comment'><ChatBubbleOutlineOutlinedIcon/>  Comment</label></ListItem>
                </List>
            </Box>
            <Box className='Comments'>
                {data.comments&&data.comments.map(comment => (
                    <Box className='comment' display="flex">
                        <img src={comment.user.profile_pic} alt="prrofile" width="40px" height="40px" />
                        <Box >
                            <Box className='text'>
                                <Typography variant='subtitle2'>{comment.user.username}</Typography>
                                <Typography variant='subtitle2' > {comment.comment} </Typography>
                            </Box>
                            <Box display='flex' className='actions'>
                                <Typography variant='caption'>Like</Typography>
                                <Typography variant='caption'>Reply</Typography>
                                <Typography variant='caption'>share</Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            <form className='addComment' onSubmit={submitComment} >
                <img src={UserGState.info.profile_pic} alt='profile' width="50px" height='32px' />
                <input placeholder='Write a comment' id='comment' className={lang === 'AR'&&"ArContent"} value={comment.comment} onChange={(e) => addContent(e.target.value)}  />
                <Box display='flex' className='icons'>
                    <InsertEmoticonIcon />
                    <CameraAltOutlinedIcon />
                    <GifOutlinedIcon />
                </Box>
            </form>
        </Box>
    )
}

export default Post;