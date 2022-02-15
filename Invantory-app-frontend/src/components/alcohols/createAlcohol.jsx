import { useContext, useState } from "react";

import GlobalContext from "../../context/globalContext";
import api from "../../api/api";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import Banner from "../banner";
import CreateForm from "../sharedComponents/createForm";

const CreateAlcohols = (props) => {
  const { alcohols, setAlcohols } = props;
  const { global } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: "",
    volumeInMl: "",
    criticalVolume: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlcohol = await api.createAlcohol(
      formData.name,
      formData.volumeInMl,
      formData.criticalVolume,
      global.user.user_id,
      global.user.jwt,
      (message, data) => {
        setAlcohols([...alcohols, data]);
        handleBannerOpen("success", message);
      },
      (errorMessage) => handleBannerOpen("error", errorMessage)
    );

    setFormData({ name: "", volumeInMl: "" });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Banner
          bannerOpen={bannerOpen}
          bannerDisplay={bannerDisplay}
          setBannerOpen={setBannerOpen}
        />

        <CreateForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormdata={setFormData}
          handleChange={handleChange}
        />
      </Box>
    </>
  );
};

export default CreateAlcohols;
