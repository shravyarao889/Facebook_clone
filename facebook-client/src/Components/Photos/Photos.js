import { Box, Typography } from '@material-ui/core';
import Profile from '../../Assets/images/profile.jpeg';
import './Photos.scss';
function Photos() {
  return (
    <Box className='PhotosSec'>
        <Box className="title" display='flex' justifyContent='space-between' alignItems='center' paddingY='10px'>
            <Typography variant='h6'>Photos</Typography>
            <Typography variant='subtitle2' color='primary'>See All Photos</Typography>
        </Box>
        <Box className='Photos' display='flex'>
            <img src="https://cdn.pixabay.com/photo/2022/02/07/14/22/woman-6999505__340.jpg" width='107px' height='107px' alt='userPic' />
            <img src="https://cdn.pixabay.com/photo/2022/03/06/03/18/friends-7050708__340.jpg" width='107px' height='107px' alt='userPic' />
            <img src="https://cdn.pixabay.com/photo/2017/04/22/19/36/girl-2252145__340.jpg" width='107px' height='107px' alt='userPic' />
        </Box>
    </Box>
  )
}

export default Photos