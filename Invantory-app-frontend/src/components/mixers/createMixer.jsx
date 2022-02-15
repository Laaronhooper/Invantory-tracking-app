import { useContext, useState } from "react";

import GlobalContext from "../../context/globalContext";
import api from "../../api/api";
import Typography from "@mui/material/Typography";

import Banner from "../banner";
import CreateForm from "../sharedComponents/createForm";

const CreateMixers = (props) => {
  const { mixers, setMixers } = props;
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
    const newMixer = await api.createMixer(
      formData.name,
      formData.volumeInMl,
      formData.criticalVolume,
      global.user.user_id,
      global.user.jwt,
      (message, data) => {
        setMixers([...mixers, data]);
        handleBannerOpen("success", message);
      },
      (errorMessage) => handleBannerOpen("error", errorMessage)
    );

    setFormData({ name: "", volumeInMl: "" });
  };

  return (
    <>
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
    </>
  );
};

export default CreateMixers;
