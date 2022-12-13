import './App.css';
import Register from "./components/Register"
import Login from "./components/Login"
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Dashboard from './components/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import { useEffect} from 'react';
import AuthService from './services/auth.service';

function App() {
  useEffect(() => {
    AuthService.isTokenValid().then((res,err)=>{
      console.log("RESuseEFF")
      console.log(res)
      if(res===false){
        window.history.replaceState(null, "Login", "/")
      }
      
    })
  }, [])
  
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path='*' element={<Dashboard />}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
