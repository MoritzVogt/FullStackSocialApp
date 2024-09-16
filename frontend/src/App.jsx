import { ThemeProvider } from "@emotion/react"
import { Button, CssBaseline } from "@mui/material"
import customTheme from "./components/customStyles/customTheme"
import Login from "./components/Pages/Login"
import Welcome from "./components/Pages/Welcome"
import Register from "./components/Pages/Register"

import Feed from "./components/Pages/Feed"
import {useEffect, useState} from "react";
import{BrowserRouter, Routes, Route,Navigate} from "react-router-dom"


function App() {

const [isLoggedIn, setLoggedIn] =useState(false);
useEffect(()=>{
  const token =localStorage.getItem("token")
  if(token){
    setLoggedIn(true);
  }
},[])

const handleLogout =()=>{
  setLoggedIn(false);
}

const handleLogin =()=>{
  setLoggedIn(true);
}

  return (
    <>
  
      <ThemeProvider theme={customTheme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
            <Route path="/welcome" element={<Welcome/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login handleLogin={handleLogin}/>}></Route>
              <Route path="/feed" element={isLoggedIn ? <Feed handleLogout={handleLogout}></Feed> : <Navigate to="/login"/>}></Route>
              <Route path="/" element={isLoggedIn ? <Navigate to="/feed"/> : <Navigate to="/welcome"/>}></Route>
            </Routes>          
          </BrowserRouter>

          {/*<Register></Register>*/}

          {/*<Login></Login> 
           {/* <Feed></Feed> */}
          {/*<Welcome></Welcome>*/}

        </CssBaseline>
      </ThemeProvider>
        
    </>
  )
}

export default App
