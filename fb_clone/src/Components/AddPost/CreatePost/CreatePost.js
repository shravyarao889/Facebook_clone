import { useContext, useEffect, useState } from "react";
import { Box, Typography , Button } from "@material-ui/core"
import './CreatePost.scss';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import GroupIcon from '@material-ui/icons/Group';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoodIcon from '@material-ui/icons/Mood';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { AddNewPost } from "../../Apis/Post";
import { CircularProgress } from "@material-ui/core";
import { AppContenxt } from "../../ContextApi/AppContext";
import { HanldleErr } from "../../Utils/Utils";
const CreatePost = ({Open , Data}) => {
    const {UserGState , disptachPost} = useContext(AppContenxt);
    const [PostData , setPostData ] = useState({images:[]}); // to store all post data 
    const [Waiting , setWaiting ] = useState(false); // for waiting when create new post
    const [lang  ,setLang] = useState("EN") // for direction of content of post languages user entered 
    //function create new post 
    const AddPost = async () => {
        setWaiting(true)
        var formData = new FormData();
        for(let key in PostData){
            if(key === 'images'){
                for(let img  of PostData.images){
                    formData.append('images' ,img)
                }
            }else{
                formData.append(`${key}` , PostData[key])
            }
        }
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          };
        // await  axios.post('post/create' , formData , config).then(res => console.log(res.data)); 
        await AddNewPost(formData , config).then(res => {
            setWaiting(false);
            disptachPost({type:"ADD_POST" , payload:res.data})
            Open(false); // close create post popup
        }).catch(err => {
            setWaiting(false)
            HanldleErr(err)
        })
    }
    // remove uploaded image 
    const removeImage = () => {
        setPostData({...PostData , images:[]});
    }
    // check content of post is arabic or english for text align 
    const addContent = (value ) => {
        let arabic = /[\u0600-\u06FF]/;
        setLang(arabic.test(value) ? "AR" : "EN");
        setPostData({...PostData , content:value})
    }
    return(
        <Box className="CreatePost" >
            <Box className="post" onClick={(e) => e.stopPropagation()}>
                <Box className="Header" paddingTop="10px" display="flex" alignItems='center' >
                    <Typography variant="h6" align="center">Create Post</Typography>
                    <CloseOutlinedIcon onClick={() => Open(false)} />
                </Box>
                <Box className="User" display="flex">
                    <img src={UserGState.info.profile_pic} alt="profile" width="40px" height='40px' />
                    <Box>
                        <Typography variant='subtitle1'> {UserGState.info.username} </Typography>
                        <Box className="place" display='flex' justifyContent='center' alignItems='center'>
                            <GroupIcon />
                            <Typography variant="caption">Friends</Typography>
                            <ArrowDropDownIcon />
                        </Box>
                    </Box>
                </Box>
                <textarea className={lang === 'AR'&&"ArContent"} rows={6}  defaultValue={Data&&Data.content} placeholder="whats in your mind, Shravya? " cols="66"  onChange={(e) => addContent(e.target.value)} />
                {!PostData.images.length ? 
                <Box className="emoji" display='flex' justifyContent='space-between' alignItems="center" >
                    <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png" width="40px" height="40px" alt="" />
                    <MoodIcon />
                </Box>
                :
                <Box className="uploadImages">
                    <img src={URL.createObjectURL(PostData.images[0])} alt="uploaded image" width='100%' />
                    <CloseIcon onClick={removeImage} /> 
                </Box>
                }
                <Box className="media" display="flex" justifyContent="space-between" alignItems='center'>
                    <Typography variant="body2">Add To your post </Typography>
                    <Box className="icons">
                        <label htmlFor="upload"><PhotoLibraryIcon /></label>
                        <input id="upload" type="file" hidden onChange={(e) => setPostData({...PostData , images:[ e.target.files[0]]})} />
                        <PersonAddIcon />
                        <MoodIcon />
                        <LocationOnIcon />
                        <MicIcon />
                        <MoreHorizIcon />
                    </Box>
                </Box>
                <Button disabled={Waiting} variant="contained"  fullWidth color='primary' onClick={AddPost}> {Waiting ? <CircularProgress /> : "Post"} </Button>
            </Box>
        </Box>
    )
}
export default CreatePost;