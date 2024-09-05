import { Button } from "@mui/material";
import React from "react";
export default function SubmitButton({text,positionValue, onHandleClick}){
    return(
        <Button
        onClick={onHandleClick}
        variant="text"
        sx={{
            width: "10vw",
            height: "10vh",
            backgroundColor:"success.main",
            color:"text.primary",
            borderRadius:"15%",
            top:"10%",
            position: positionValue ? positionValue : "relative"
        }}>  
           {text}       
        </Button>
    )
}