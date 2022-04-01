import {useState , useContext} from 'react';
import {Box , Grid , Container, Typography , FormControl  , TextField, Button} from '@material-ui/core'
import './Login.scss'
import Signup from '../../Components/Signup/Signup';
import { SignIn } from '../../Apis/Auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useNavigate} from 'react-router-dom'
import { AppContenxt } from '../../ContextApi/AppContext';
import { HanldleErr } from '../../Utils/Utils';

const Login = () => {
    const {dispatchUser} = useContext(AppContenxt);
    const [user , setUser] = useState({});
    const [signupModal , setSignupModal] = useState(false);
    const [Err , setErr] = useState('');
    const [waiting , setWaiting] = useState(false)
    const Navigate = useNavigate()
    //get data from inputs 
    const userForm = (e , field) => {
        setUser({...user , [field]:e.target.value});
    }
    // handle submit form 
    const HandleSumbit = async(e) => {
        e.preventDefault();
        setWaiting(true);
        setErr("")
        await SignIn(user).then(res => {
            localStorage.setItem("AccessToken" , res.data.token);
            setWaiting(false);
            dispatchUser({type:"LOGIN" , payload:res.data})
            window.location.replace('/')
            // Navigate('/')
        }).catch(err => {
            setWaiting(false)
            setErr(err.response.data.message)
            HanldleErr(err)
        });
    }
    // to close sign up modal when click outside form
    // window.onclick = () => {
    //     setSignupModal(false);
    // }
    return(
        <Box className='Login'>
            {signupModal&&<Signup open={setSignupModal} />}
            <Container>
                <Grid container spacing={10}>
                    <Grid item xs={12} md={6}>
                        <img className='logo' src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="logo" width="300px" />
                        <Typography variant='h4'>Facebook helps you connect and share with the people in your life.</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className='form' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <FormControl fullWidth className='MuiForm'>
                                <TextField onChange={(e) => userForm(e , "email")} variant='outlined' placeholder='Email address or phone number' autoComplete='true'  required error={Err.length ? true : false} />
                                <TextField type='password'  onChange={(e) => userForm(e , "password")} variant='outlined' placeholder='Password' autoComplete='false' required error={Err.length ? true : false} />
                                <Typography color='secondary'  align='center' display='block'>{Err}</Typography> <br/>
                                <Button type='submit ' fullWidth variant='contained' color='primary'  onClick={HandleSumbit}> {waiting ? <CircularProgress /> : "Log in"} </Button>
                            </FormControl>
                            <Typography className='forget' color='primary' align='center' variant='caption'>Forget Passwrod ?</Typography>
                            <Button disabled={waiting} variant='contained' className='newAcc' onClick={(e) => {e.stopPropagation();setSignupModal(true)}}>Create New Account</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default Login;