import React, { createContext } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utills/theme";
import Routing from "./routes/Routing";
import "./App.css";
import { SnackbarProvider } from "notistack";
export const UserContext = createContext();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{vertical:"top",horizontal:"right"}} maxSnack={2}>
        <Routing />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
