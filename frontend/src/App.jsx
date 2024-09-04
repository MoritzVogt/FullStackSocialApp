import { ThemeProvider } from "@emotion/react"
import { Button, CssBaseline } from "@mui/material"
import customTheme from "./components/customStyles/customTheme"
import Login from "./components/Pages/Login"
import Register from "./components/Pages/Register"

function App() {


  return (
    <>
  
      <ThemeProvider theme={customTheme}>
        <CssBaseline>
          <Register></Register>
        </CssBaseline>
      </ThemeProvider>
        
    </>
  )
}

export default App
