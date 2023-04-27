import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette:{
    primary:{
      main: "#ffff",//whitefontforbackgorund
    },
    secondary:{
      main: '#d1adcc',//pinklightbackground
    },
    otherColor:{
      main:"#403e3e"//fontgary
    }
  },
  typography:{
    fontFamily:"roboto",
    fontSize:14,
    fontWeight:400,
  }
})