import { useContext, useState } from "react";

import * as React from "react";
import Button from "@mui/material/Button";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import GlobalContext from "../../context/globalContext";
import EditModal from "./editModal";

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

const EditButton = ({ item, updateItem, editAPI }) => {
  const { global } = useContext(GlobalContext);
  const { id, name, volume_in_ml, critical_volume, user_id } = item;
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerDisplay, setBannerDisplay] = useState({
    variant: "outlined",
    severity: "success",
    message: "",
  });

  const handleBannerOpen = (severity, message) => {
    setBannerDisplay({
      ...bannerDisplay,
      severity: severity,
      message: message,
    });
    setBannerOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBannerOpen(false);
    setFormData({});
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editAPI(
      id,
      formData.name,
      formData.volumeInMl,
      formData.criticalVolume,
      user_id,
      global.user.jwt,
      (data, message) => {
        updateItem(data);
        handleBannerOpen("success", message);
      },
      (errorMessage) => {
        handleBannerOpen("error", errorMessage);
      }
    );
    setFormData({});
  };

  return (
    <div>
      <Button
        data-cy="edit-button"
        sx={{ borderRadius: 16, display: "inline" }}
        variant="outlined"
        onClick={handleOpen}
      >
        <EditTwoToneIcon />
      </Button>
      <EditModal
        open={open}
        handleClose={handleClose}
        bannerOpen={bannerOpen}
        bannerDisplay={bannerDisplay}
        setBannerOpen={setBannerOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        item={item}
      />
    </div>
  );
};

export default EditButton;
