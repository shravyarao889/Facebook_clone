import { Box, Button, Typography } from "@material-ui/core"
import WorkIcon from '@material-ui/icons/Work';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import './UserInfo.scss';
function UserInfo() {
  return (
    <Box className="userInfo">
        <Typography variant='h6' className="title">Intro</Typography>
        <Button variant="contained" fullWidth>Add Bio</Button>
        <Box className="content">
            <Box display='flex' alignItems='center' marginY="15px">
                <WorkIcon />
                <Typography variant="subtitle1">Works at Google</Typography>
            </Box>
            <Box display='flex' alignItems='center' marginY="15px">
                <WorkIcon />
                <Typography variant="subtitle1">Full stack at Google </Typography>
            </Box>
            <Box display='flex' alignItems='center' marginY="15px">
                <HomeWorkIcon />
                <Typography variant="subtitle1">Lives in Hyderabad, India</Typography>
            </Box>
        </Box>
        <Button variant='contained' fullWidth>Edit Details</Button>
        <Button variant='contained' fullWidth>Add Hobbies</Button>
        <Button variant='contained' fullWidth>Add Featured</Button>
    </Box>
  )
}

export default UserInfo