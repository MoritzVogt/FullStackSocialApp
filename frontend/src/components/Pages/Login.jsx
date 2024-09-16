import {Button, Box } from "@mui/material";
import Headline from "../parts/headerLogin/Headline";
import TextFieldLogin from "../parts/textFieldsLogin/TextFieldLogin";
import SubmitButton from "../parts/buttonsLogin/SubmitButton";
import SmallHelperText from "../parts/textLogin/SmallHelperText";
import { useNavigate } from "react-router-dom";
import {useRef} from "react"
import showNotification from "../parts/notification/showNotification.js";


export default function Login({handleLogin}){
    const valueEmail =useRef();
    const valuePassword =useRef();
    const navigator = useNavigate();
    const handleClick = async(e) =>{
        console.log(valuePassword.current.value)
        const data= {
            email: valueEmail.current.value,
            password: valuePassword.current.value,            
        }
        console.log(data)
        try{
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            
         showNotification(`Erfolgreich eingeloggt`,"normal")
            handleLogin(true);
            navigator("/feed")
        } 
         else if (response.status === 401) {
        showNotification(`Passwort oder Email ungültig`,"normal");
    } 
    else if (response.status === 404) {
        showNotification(`bitte geben Sie ihre EmailAdresse und Passwort ein`,"normal");
    }
    else {
        const errorData = await response.json();
        console.error('Failed to register user');
        showNotification(`${errorData.error}`,"normal");
    }
    } catch (error) {
        console.error('Error while login user:', error);
        setErrorMessage('Error while login user.');
    }
    }
    return(
        <Box sx={{
            width: "100vw",
            height:"100vh",
            display:"grid",
            gridTemplateRows:"15% 65% 20%",
            fontSize:"40px"
        }}>
        
        <Headline weight={"30px"}></Headline>

         <Box sx={{
            width:"100%",
            height:"100%",
            display:"grid",
            gridTemplateColumns:"50% 50%",
           
         }}>
            <Box sx={{
                width:"100%",
                height:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                
            }}>
                <TextFieldLogin valueEmail={valueEmail} valuePassword={valuePassword}/>
            </Box>
            
            <Box sx={{
             width:"100%",
            height:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
            }}>
                <img width={"700px"} src="https://th.bing.com/th/id/OIP.F4hwQKKqjgZEtY_gThLk9AHaEK?w=304&h=180&c=7&r=0&o=5&pid=1.7" alt="pic of cat"></img>
            </Box>
            </Box>   

            {/*Submitbuttons and Helpertext*/}
            <Box sx={{
             width:"100%",
            height:"100%",
            backgroundColor:"background.paper",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            rowGap:"10%"
            }}>

              {/*Submitbutton*/}
              <SubmitButton onHandleClick={handleClick} text={"login"}></SubmitButton>
              {/*SmallHelperText*/} 
              <SmallHelperText text={"Continue to feed"}></SmallHelperText>
              <Box sx={{
                width:"80vw",
                display:"flex",
                gap:"1%",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"red"
              }}>
              </Box>
            </Box>

        </Box>

    )
}