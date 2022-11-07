import React, { useRef, useState } from 'react'
import { Paper, Grid, Avatar, TextField, Button } from '@mui/material'
import { width } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AuthService from '../services/auth.service';
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const userReff = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate()

const usernameHandler = (e) => {
  setUser(e)
  console.log("Username je: " + user)
}
const pwdHandler = (e) => {
  setPwd(e)
    console.log("Heslo je: " + pwd)
}
const loginHandler = () => {
  AuthService.login(user, pwd).then((res,err)=>{
    console.log("RESLOGIN:")
    console.log(res)
    console.log(err)
    if(res.username){
      navigateToDashboard()
    }
    
});
}
const navigateToDashboard = () => {
  navigate('/dashboard')
  window.location.reload();
}

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        
      >
        <Paper elevation={3} style={{width: "30vw", height: "50vh", margin: "auto", marginTop: "calc(50vh - 25vh)"}}>
      <div align="center" style={{paddingTop: "50px"}}>
      <Avatar style={{backgroundColor: '#2E7D33'}}><LockOutlinedIcon/></Avatar>
      <h2>Sign In</h2>
      </div>
      <TextField id="outlined-basic" label="Username" variant="outlined" placeholder='Enter username' style={{width: "60%"}} required onChange={e => usernameHandler(e.target.value)}/><br/>
      <TextField id="outlined-basic" label="Password" variant="outlined" placeholder='Enter password' style={{width: "60%"}} type="password" required onChange={e => pwdHandler(e.target.value)}/>
      <br/>
      <Button variant="contained" style={{width: "60%", marginTop: "10px"}} size="large" startIcon={<LockOpenOutlinedIcon/>} color="success" onClick={loginHandler}>Sign In</Button>
        </Paper>
      </Grid>
        
    </div>
  )
}

export default Login