import React, { createContext } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utills/theme";
import Routing from "./routes/Routing";
import "./App.css";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux";
export const UserContext = createContext();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            maxSnack={2}
          >
            <Routing />
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
