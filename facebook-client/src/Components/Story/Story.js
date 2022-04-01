import { Box } from "@material-ui/core";
import Profile from '../../Assets/images/profile.jpeg'
import AddIcon from '@material-ui/icons/Add';
import './Story.scss'
const Story = () => {
    return(
        <Box className="Stories" display="flex" justifyContent="center" >
            <Box className="story noStory">
                <img className="storyImg" src="https://cdn.pixabay.com/photo/2022/02/07/14/22/woman-6999505_960_720.jpg" width="100%" />
                <Box className="Add" display="flex" justifyContent="center" alignItems="center">
                    <AddIcon />
                </Box>
                <p className="title ">Create Story</p>
            </Box>
            <Box className="story">
                <img className="storyImg" src="https://cdn.pixabay.com/photo/2013/05/30/18/21/cat-114782_960_720.jpg" width="100%" />
                <h6 className="title">Chandrakant</h6>
                <img src="https://cdn.pixabay.com/photo/2018/11/22/08/05/thor-3831290__340.png" alt="username" width="30px" height="30px" className="userImg" />
            </Box>
            <Box className="story">
                <img className="storyImg" src="https://cdn.pixabay.com/photo/2022/03/06/03/18/friends-7050708_960_720.jpg" width="100%" />
                <h6 className="title">Reshma</h6>
                <img src="https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662__340.jpg" alt="username" width="30px" height="30px" className="userImg" />
            </Box>
            <Box className="story">
                <img className="storyImg" src="https://cdn.pixabay.com/photo/2020/10/29/19/56/lighthouse-5697134_960_720.jpg" width="100%" />
                <h6 className="title">Anand</h6>
                <img src="https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332__340.jpg" alt="username" width="30px" height="30px" className="userImg" />
            </Box>
            <Box className="story">
                <img className="storyImg" src="https://cdn.pixabay.com/photo/2022/02/26/21/47/elephant-7036431_960_720.jpg" width="100%" />
                <h6 className="title">Rajiv</h6>
                <img src="https://images.news18.com/ibnlive/uploads/2022/01/army-day-16421788574x3.jpg" alt="username" width="30px" height="30px" className="userImg" />
            </Box>
           
        </Box>
    )
}

export default Story;