import {createTheme} from "@mui/material";

const customTheme = createTheme({
    palette:{
        primary:{
            main: '#D9D9D9',
        },
        background:{
            default:'#87ab69',
            paper: '#658354'
        },
        text:{
            primary: '#2b3627',
            secondary: '#292929'
        },
        success:{
            main: '#805128'
        }
    }
})

export default customTheme;