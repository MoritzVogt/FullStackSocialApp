import { ThemeProvider } from "@emotion/react"
import { Button, CssBaseline } from "@mui/material"
import customTheme from "./components/customStyles/customTheme"
import Login from "./components/Pages/Login"

function App() {


  return (
    <>
  
      <ThemeProvider theme={customTheme}>
        <CssBaseline>
          <Login></Login>
        </CssBaseline>
      </ThemeProvider>
        
    </>
  )
}

export default App
