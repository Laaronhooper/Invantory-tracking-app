import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const Banner = ({ bannerOpen, bannerDisplay, setBannerOpen }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={bannerOpen}>
        <Alert
          variant={bannerDisplay.variant}
          severity={bannerDisplay.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setBannerOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {bannerDisplay.message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Banner;
