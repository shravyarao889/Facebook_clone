import { Box , Typography } from "@material-ui/core"
import Profile from '../../Assets/images/profile.jpeg'
import './Friends.scss'
const Friends = () => {
    return (
        <Box className='Friends'>
            <Box className="title" display='flex' justifyContent='space-between' alignItems='flex-start' paddingY='10px'>
                <Box>
                    <Typography variant='h6'>Friends</Typography>
                    <Typography variant="subtitle">5 friends</Typography>
                </Box>
                <Typography variant='subtitle2' color='primary'>See All Friends</Typography>
            </Box>
            <Box className="Content" display='flex' flexWrap='wrap'>
                <Box display='flex' flexDirection="column">
                    <img src="https://cdn.pixabay.com/photo/2018/11/22/08/05/thor-3831290__340.png" width='100px' height='100px' alt="friendName" />
                    <Typography variant="caption">Chandrakant</Typography>
                </Box>
                <Box display='flex' flexDirection="column">
                    <img src="https://cdn.pixabay.com/photo/2022/03/16/06/18/bird-7071662__340.jpg" width='100px' height='100px' alt="friendName" />
                    <Typography variant="caption">Reshma</Typography>
                </Box>
                <Box display='flex' flexDirection="column">
                    <img src="https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332__340.jpg" width='100px' height='100px' alt="friendName" />
                    <Typography variant="caption">Anand</Typography>
                </Box>
                <Box display='flex' flexDirection="column">
                    <img src="https://images.news18.com/ibnlive/uploads/2022/01/army-day-16421788574x3.jpg" width='100px' height='100px' alt="friendName" />
                    <Typography variant="caption">Rajiv</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Friends