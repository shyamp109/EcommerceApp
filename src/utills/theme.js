import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffff", //whitefontforbackgorund
    },
    secondary: {
      main: "#E6B713", //pinklightbackground
    },
    otherColor: {
      main: "#403e3e", //fontgary
    },
    grayColor: {
      main: "#708090",
    },
  },
  typography: {
    fontFamily: "roboto",
    fontSize: 14,
    fontWeight: 400,
  },
});
