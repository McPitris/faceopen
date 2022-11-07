import React from 'react'
import Login from './components/Login'
import {Outlet} from "react-router"

const useAuth = () => {
    const user = localStorage.getItem('user')
    console.log("user:");
    console.log(user);
    if(user){
      console.log("user if");
        return user && true
    }
    else{
      console.log("user else");
        return false
    }
    
}

const ProtectedRoutes = () => {
  const isAuth =  useAuth();
  console.log(isAuth);
//   return isAuth ? <Outlet /> : <Navigate to="/"/>;
  return isAuth ? <Outlet /> : <Login/>;
}

export default ProtectedRoutes