import React, { useContext } from "react";
import Login from "../components/login";

import GlobalContext from "../context/globalContext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const Signin = () => {
  const { global, setGlobal } = useContext(GlobalContext);

  return (
    <>
      <div id="bg-img">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <img src="/logo_small.png" height="10%" />
          <Login />
        </Grid>
      </div>
    </>
  );
};

export default Signin;
