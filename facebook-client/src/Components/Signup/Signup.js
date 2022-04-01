import { useEffect, useState } from 'react';
import { FormControl , TextField , Button , InputLabel, Box, Typography , Select , MenuItem , Radio , RadioGroup , FormControlLabel } from '@material-ui/core';
import './Signup.scss'
import CloseIcon from '@material-ui/icons/Close';
import HelpIcon from '@material-ui/icons/Help';
import { createAccount } from '../../Apis/Auth';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Signup({open}) {
    const [newUser , setNewUser] = useState({
        username:"",
        surname:"",
        email:"",
        password:"",
        gender:"male",
        day:"",
        month:"",
        year:"" 
    });
    const [Err , setErr] = useState({})
    const [waiting , setWaiting] = useState(false)
    const Months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"] 
    //handle submit function 
    const HandleChange = (e , field) =>{
        setNewUser({...newUser , [field]:e.target.value});
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setWaiting(true)
        // for handle error 
        var inerr = {};
        for(let key in newUser){
            if(!newUser[key].length){
                inerr = {...inerr , [key]:`${key} is required ` }
                setWaiting(false)
            }
        }
        setErr(inerr);
        if(!Object.keys(inerr).length){
            console.log(newUser)
            await createAccount(newUser).then(res => {
                console.log(res.data);
                setWaiting(false);
                open(false)
            }).catch(err => {
                setWaiting(false)
                setErr({...Err , email:err.response.data.message})
                console.log(err.response.data.message)
            })
        }
    }
    return(
        <Box className='Signup' >
            <Box className='content' onClick={(e) => e.stopPropagation()}>
                <Box className='Header' display='flex' justifyContent='space-between' alignItems='flex-start'>
                    <Box>
                        <Typography variant='h5'>Sign up</Typography>
                        <Typography variant='subtitle2'>It's quick and easy.</Typography>
                    </Box>
                    <CloseIcon onClick={() => open(false)} />
                </Box>
                <form onSubmit={HandleSubmit}>
                    <FormControl>
                        <Box className='nameFields' display='flex' justifyContent='center'>
                            <TextField error={Err.username ? true : false} helperText={Err.username&&Err.username }  variant='outlined' size='small'  placeholder='username' required onChange={(e) => HandleChange(e , 'username')} />
                            <TextField error={Err.surname ? true : false} helperText={Err.surname&&Err.surname }  variant='outlined' size='small' placeholder='surname' required onChange={(e) => HandleChange(e , 'surname')} />
                        </Box>
                        <TextField error={Err.email ? true : false} helperText={Err.email&&Err.email }  variant='outlined' size='small' required type='email' placeholder='Email address'  onChange={(e) => HandleChange(e , 'email')}/>
                        <TextField error={Err.password ? true : false} helperText={Err.password&&Err.password } variant='outlined' size='small' required type='password'  placeholder='New Password' onChange={(e) => HandleChange(e , 'password')} />
                    </FormControl>
                    {/* Birtht day part  */}
                    <Typography className='birthCaption' display='block' variant='caption'>Date of birth <HelpIcon className='helpIcon'  /></Typography>
                    <Box className='birth' display='flex' >
                        <FormControl fullWidth  >
                            <Select
                                value={newUser.day ? newUser.day : "2" }
                                onChange={(e) =>HandleChange(e , "day") }
                                variant='outlined'
                                error={Err.day ? true : false} 
s                            >
                                {[...Array(31)].map((num,i) => (
                                    <MenuItem  key={i}  value={`${i+1}`} >{i+1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <Select
                                value={newUser.month ? newUser.month : "Feb" }
                                onChange={(e) =>HandleChange(e , "month") }
                                variant='outlined'
                                error={Err.month ? true : false} 
                            >
                                {Months.map((month ,i) => (
                                    <MenuItem key={i} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth onClick={(e) => e.stopPropagation()} >
                            <Select
                                value={newUser.year ? newUser.year : "2022" }
                                onChange={(e) =>HandleChange(e , "year") }
                                variant='outlined'
                                error={Err.year ? true : false}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {[...Array(2022-1904)].map((num,i) => (
                                    <MenuItem  key={i}  value={`${2022-i}`} >{2022-i}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className='GenderContainer'>
                        <Typography className='birthCaption Gender' display='block' variant='caption'>Gender <HelpIcon className='helpIcon'  /></Typography>
                        <Box className='Gender' display='flex' >
                            <FormControl>
                                <RadioGroup className='RadioGroup' defaultValue="male" onChange={(e) => HandleChange(e , 'gender')}  >
                                    <FormControlLabel  value='male' control={<Radio  size='small' color='primary' />} label='Male' />
                                    <FormControlLabel value='female' control={<Radio size='small' color='primary' />} label='Female' />
                                    <FormControlLabel value='custome' control={<Radio size='small'   color='primary' />} label='Custome' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                    <Typography variant='caption' className='terms'>
                        By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.
                    </Typography>
                    <Button type='submit' disabled={waiting} className={`signBTN ${waiting&&"DisabledBTN"}`} variant='contained' fullWidth onClick={HandleSubmit}> {waiting ? <CircularProgress /> : "Sign Up  "} </Button>
                </form>
            </Box>
        </Box>
    );
}
