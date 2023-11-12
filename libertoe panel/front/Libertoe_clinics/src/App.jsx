import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginPage from './pages/login';
import { useContext } from 'react';
import { UserContext } from './context/provider';
import { netCall } from './lib/netcall';
import HomePage from './pages/Home';

function App() {
  const {isLoggedIn, setIsLoggedIn, setUserData} = useContext(UserContext);

  const navigate = useNavigate()

  useEffect(()=>{
    async function authenticate(){
      const token = localStorage.getItem("token")
      if(token){
        const res = await netCall("checkauth", "get")
        if(res.status === 200){
          setIsLoggedIn(true)
          setUserData(res.data)
          navigate("/")
        }else{
          navigate("/login")
        }
      }else{
        navigate("/login")
      }
    }
    authenticate()
  },[])

  return (
    <>
      <Routes>
        {isLoggedIn && (
          <Route path="/" element={<HomePage/>} />
        )}
        {isLoggedIn && (
          <Route path="/profile" element={<p>profile page</p>} />
        )}

        {!isLoggedIn && (
          <Route path="/login" element={<LoginPage/>} />
        )}
        {isLoggedIn && navigate("/")}
        {!isLoggedIn && navigate("/login")}
      </Routes>
    </>
  )
}

export default App
