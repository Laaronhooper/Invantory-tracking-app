import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../context/globalContext";
import api from "../../api/api";

import Banner from "../banner";
import { Stack } from "@mui/material";
import { TextField, Box } from "@mui/material";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const CreateDrinks = ({ drinks, setDrinks, alcohols, mixers }) => {
  const { global } = useContext(GlobalContext);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [newDrinks, setNewDrinks] = useState({
    name: "",
    alcohol_id: "",
    alcohol_amount: "",
    mixer_id: "",
    mixer_amount: "",
  });

  useEffect(() => {
    if (alcohols === null || mixers === null) {
      setNewDrinks({
        ...newDrinks,
        name: "",
        alcohol_id: alcohols === !null ? alcohols[0].id : "",
        alcohol_amount: "",
        mixer_id: mixers === !null ? mixers[0].id : "",
        mixer_amount: "",
      });
    }
  }, [alcohols, mixers]);

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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewDrinks({ ...newDrinks, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDrink = await api.createDrink(
      newDrinks.name,
      newDrinks.alcohol_id,
      newDrinks.alcohol_amount,
      newDrinks.mixer_id,
      newDrinks.mixer_amount,
      global.user.user_id,
      global.user.jwt,
      (message, data) => {
        setDrinks([...drinks, data]);
        handleBannerOpen("success", message);
      },
      (errorMessage) => handleBannerOpen("error", errorMessage)
    );

    setNewDrinks({
      name: "",
      alcohol_id: alcohols[0].id,
      alcohol_amount: "",
      mixer_id: mixers[0].id,
      mixer_amount: "",
    });
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
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ minWidth: 100, maxWidth: 200 }}>
            <TextField
              id="outlined-name"
              label="Name"
              name="name"
              variant="standard"
              value={newDrinks.name}
              onChange={handleChange}
            />
            <FormControl>
              <InputLabel id="alcohol">Alcohol</InputLabel>
              <Select
                sx={{ mb: 2 }}
                labelId="alcohol"
                id="alcoholid"
                name="alcohol_id"
                variant="standard"
                value={newDrinks.alcohol_id ?? ""}
                onChange={handleChange}
                label="Alcohol"
              >
                {alcohols != null
                  ? alcohols.map((alcohol, i) => (
                      <MenuItem value={alcohol.id} key={i}>
                        {alcohol.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <TextField
              id="outlined-alcohol_amount"
              label="Alcohol Amount"
              name="alcohol_amount"
              variant="standard"
              value={newDrinks.alcohol_amount ?? ""}
              onChange={handleChange}
            />
            <FormControl>
              <InputLabel id="alcohol">Mixer</InputLabel>
              <Select
                sx={{ mb: 2 }}
                labelId="mixer"
                id="mixerid"
                name="mixer_id"
                variant="standard"
                value={newDrinks.mixer_id ?? ""}
                onChange={handleChange}
                label="Mixer"
              >
                {mixers != null
                  ? mixers.map((mixer, i) => (
                      <MenuItem value={mixer.id} key={i}>
                        {mixer.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <TextField
              id="outlined-mixer_amount"
              label="Mixer Amount"
              name="mixer_amount"
              variant="standard"
              value={newDrinks.mixer_amount ?? ""}
              onChange={handleChange}
            />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default CreateDrinks;
