import { createTheme } from "@mui/material/styles";
import { deepPurple, grey } from "@mui/material/colors";

const invantorTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: deepPurple[100],
    },
    grey: {
      main: grey[200],
    },
  },
});

export default invantorTheme;
