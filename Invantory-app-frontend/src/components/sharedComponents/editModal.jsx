import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import Banner from "../banner";
import { Button } from "@mui/material";

import EditForm from "./editForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({
  open,
  handleClose,
  bannerOpen,
  bannerDisplay,
  setBannerOpen,
  handleChange,
  handleSubmit,
  item,
}) => {
  return (
    <Modal
      data-cy="edit-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Banner
          bannerOpen={bannerOpen}
          bannerDisplay={bannerDisplay}
          setBannerOpen={setBannerOpen}
        />
        <EditForm
          handleSubmit={handleSubmit}
          item={item}
          handleChange={handleChange}
        />
      </Box>
    </Modal>
  );
};

export default EditModal;
