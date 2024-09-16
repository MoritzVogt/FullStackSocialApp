import { Box, Button, TextField} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TextfieldLogin({valueEmail,valuePassword})
{
    const [fieldType,setFieldType] =useState(true);
    const navigator = useNavigate();

const handleClick =() =>{
    navigator("/register");
}
    return(

        <Box 
        component="form"
        autoComplete="off"
        sx={{
            display:"flex",
            flexDirection:"column",
            width:"80%",
            height:"100%",
            alignItems:"flex-end",
            justifyContent:"center"
        }}
        >
        <TextField
        inputRef={valueEmail}
        sx={{
          width:"30%",
          marginBottom:"3%",          
        }}
        required
        type="email"
        id="outlined-required"
        label="Email"
        defaultValue="email"
        name="email" />

        <TextField
        inputRef={valuePassword}
        sx={{
          width:"30%",
          marginBotton:"10%",          
        }}
        required
        type={fieldType ? "password":"text"}
        id="outlined-required"
        label="password"
        defaultValue="password"
        name="password" /><VisibilityIcon onClick={(e)=> setFieldType(!fieldType)}></VisibilityIcon>
       
        <Box
        sx={{
            width: "30%",
            color:"text.primary",
            display:"flex",
            gap:"30%",
            justifyContent:"start"
        }}>

        <Button 
        onClick={handleClick}
        sx={{
            width:"30%",
            color:"text.primary"
        }}
        >Register</Button> 
         <Button sx={{
            width:"30%",
            color:"text.primary"
        }}
        >Forgot Password?</Button> 

        
        </Box>
        
        </Box>
    )
}