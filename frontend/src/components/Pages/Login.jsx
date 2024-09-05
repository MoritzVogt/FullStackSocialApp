import {Button, Box } from "@mui/material";
import Headline from "../parts/headerLogin/Headline";
import TextFieldLogin from "../parts/textFieldsLogin/TextFieldLogin";
import SubmitButton from "../parts/buttonsLogin/SubmitButton";
import SmallHelperText from "../parts/textLogin/SmallHelperText";

export default function Login(){
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
                <TextFieldLogin/>
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
              <SubmitButton text={"login"}></SubmitButton>
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