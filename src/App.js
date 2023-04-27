import React, { createContext} from "react";
import { ThemeProvider} from "@mui/material";
import { theme } from "./utills/theme";
import Routing from "./routes/Routing";
import "./App.css";
export const UserContext = createContext();

const App = () => {

  return (
    <ThemeProvider theme={theme}>
        <Routing />
    </ThemeProvider>
  );
};

export default App;
