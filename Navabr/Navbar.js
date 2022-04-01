import { Box , Grid  } from "@material-ui/core"
import Logo from '../../Assets/images/logo.png'
import './Navbar.scss';
import { Link } from "react-router-dom";
//icons
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
    // add active class to list 
    const addActive = (e) => {
        let target = e.target.closest('span');
        let list = document.querySelectorAll('.middel span');
        list.forEach(li => li.classList.remove('active'));
        target.classList.add('active')
    }
    return(
        <Box className="Navbar" >
            <Grid container>
                <Grid item xs={6} sm={4} md={4}>
                    <Box className="left" display="flex" alignItems={"center"} >
                        <Link to='/'><img src={Logo} alt="facebook" width="40px" /></Link>
                        <Box className="search" marginLeft="10px" alignItems="center" display="flex">
                            <SearchIcon />
                            <input type="text" placeholder="Search Facebook" />
                        </Box>
                        <MenuIcon className="menu" />
                    </Box>
                </Grid>
                <Grid item sm={4} md={4}>
                    <Box className="middel" onClick={addActive}>
                        <span className="active"><HomeIcon /></span>
                        <span > <OndemandVideoIcon /></span>
                        <span> <StorefrontIcon/>   </span>
                        <span>  <PeopleIcon /></span>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <Box className="Right" >
                        <span><MessageIcon/> </span>
                        <span><NotificationsIcon /></span>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Navbar;