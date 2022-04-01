import { useContext } from "react";
import { Box , List , ListItem , Typography } from "@material-ui/core"
import './AddPost.scss';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { AppContenxt } from "../../ContextApi/AppContext";

const AddPost = ({OpenCreatePost}) => {
    const {UserGState} = useContext(AppContenxt);
    return(
        <Box className="addPost">
            <Box className="TextArea" display="flex">
                <img src={UserGState.info.profile_pic} alt="profile" width="40px" height="40px" />
                <input  placeholder={`whats in your mind, ${UserGState.info.username} ?`}  onClick={(e) => {e.stopPropagation(); OpenCreatePost(true) }}/>
            </Box>
            <List className="Actions">
                <ListItem button>
                    <VideoCallIcon />
                    <Typography variant="body2"> Live Video </Typography>
                </ListItem>
                <ListItem button>
                    <PhotoLibraryIcon />
                    <Typography  variant="body2" onClick={(e) => {e.stopPropagation(); OpenCreatePost(true) }}>photo/video</Typography>
                </ListItem>
                <ListItem button>
                    <SentimentVerySatisfiedIcon />
                    <Typography variant="body2">Feeling/Activity</Typography>
                </ListItem>
            </List>
        </Box>
    )
}
export default AddPost;