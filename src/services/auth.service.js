import axios from "axios";
import authHeader from "./auth-header";
import {useNavigate} from "react-router-dom"
import Login from "../components/Login";

const API_URL = "https://facerecog-gate-be.herokuapp.com/api/v1/auth/";

const register = (firstname, lastname, username, password, imgCount) => {
  return axios.post(API_URL + "register",{
    firstname,
    lastname,
    username,
    password,
    imgCount
  }).then((res, err) => {
    console.log(res)
    console.log(err)
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
        console.log("Response:")
        console.log(response)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const isTokenValid = () => {
  return axios
    .get(API_URL + "valid-token", {
      headers: authHeader()
    })
    .then((response) => {
      if(response.status !== 200){
        logout()
        return false
      }else{
        return true
      }
    }).catch(err =>{
      console.log(err)
      logout()
      return false
    });
};

const logout = () => {
  if(localStorage.getItem("user")){
    localStorage.removeItem("user");
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  isTokenValid,
  logout,
  getCurrentUser,
};