import LoginDialog from "../dialogs/LoginDialog";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LoginScreen = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>

      <LoginDialog/>
    </ThemeProvider>
  )
}

export default LoginScreen;