import {useContext} from 'react';
import { Box , Typography , List , ListItem } from "@material-ui/core"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'
import './Sidebar.scss'
import { AppContenxt } from '../../ContextApi/AppContext';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const {UserGState , dispatchUser} = useContext(AppContenxt)
    const navigate = useNavigate();
    //logout function
    const Logout = () => {
        dispatchUser({type:"LOGOUT"})
        navigate('/login');
    }
    return(
        <Box className="Sidebar">
            <List component="nav" aria-label="main mailbox folder">
                <Link to='/profile'>
                    <ListItem button className="profilePic">
                            <img src={UserGState.info.profile_pic} width="28px" height="28px" />
                            <Typography variant="subtitle1">{UserGState.info.username}</Typography>
                    </ListItem>
                </Link>
                <Link to='/friends'>
                    <ListItem button>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/-XF4FQcre_i.png" alt="groups" width="28px" height="28px" />
                        <Typography variant="subtitle1">Friends </Typography>
                    </ListItem>
                </Link>
                <Link to = "/groups">
                <ListItem button>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/mk4dH3FK0jT.png" alt="groups" width="28px" height="28px" />
                    <Typography variant="subtitle1">Groups</Typography>
                </ListItem>
                </Link>
                <ListItem button>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/9BDqQflVfXI.png" alt="groups" width="28px" height="28px" />
                    <Typography variant="subtitle1">Marketplace</Typography>
                </ListItem>
                <ListItem button>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/A1HlI2LVo58.png" alt="groups" width="28px" height="28px" />
                    <Typography variant="subtitle1">Watch</Typography>
                </ListItem>
                <ListItem button>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/AYj2837MmgX.png" alt="groups" width="28px" height="28px" />
                    <Typography variant="subtitle1">Memories</Typography>
                </ListItem>
                <ListItem button onClick={Logout}>
                    <ExitToAppIcon/>
                    <Typography variant="subtitle1">Logout</Typography>
                </ListItem>
            </List>
        </Box>
    )
}
export default Sidebar