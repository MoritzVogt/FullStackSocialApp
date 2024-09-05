import { ThemeProvider } from "@emotion/react"
import { Button, CssBaseline } from "@mui/material"
import customTheme from "./components/customStyles/customTheme"
import Login from "./components/Pages/Login"

import Register from "./components/Pages/Register"

import Feed from "./components/Pages/Feed"


function App() {


  return (
    <>
  
      <ThemeProvider theme={customTheme}>
        <CssBaseline>

          <Register></Register>

          {/* <Login></Login> */}
          <Feed></Feed>

        </CssBaseline>
      </ThemeProvider>
        
    </>
  )
}

export default App
