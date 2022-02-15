import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import GlobalContext from "../context/globalContext";
import api from "../api/api";

import CreateDrinks from "../components/drinks/createDrink";
import ShowDrinks from "../components/drinks/showDrinks";

const Drinks = ({
  alcohols,
  setAlcohols,
  mixers,
  setMixers,
  updateMixer,
  updateAlcohol,
}) => {
  const { global } = useContext(GlobalContext);
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (!global.user) {
      navigate("/signin");
      /// QUESTION FOR ANINDHA, why does the return jsx display for a split second before the redirect to signin?
    } else {
      // API call that was moved from the showdrinks component up to the drinks component to allow for state to be managed in a parent component for children components to use
      const initialDrinks = await api.getDrinks();
      setDrinks(initialDrinks);
      setLoading(false);
    }
  }, []);

  const updateDrink = (index, updatedDrink) => {
    const updated = drinks.map((drink, i) => {
      return i === index ? updatedDrink : drink;
    });
    setDrinks(updated);
  };

  return (
    <>
      <Box p={3}>
        <Typography align="center" variant="h5" color="primary">
          Drinks
        </Typography>
      </Box>
      <Accordion>
        <AccordionSummary>
          <Typography color="primary">Create</Typography>
        </AccordionSummary>
        <Box display="flex" justifyContent="center">
          <AccordionDetails>
            <CreateDrinks
              drinks={drinks}
              setDrinks={setDrinks}
              alcohols={alcohols}
              setAlcohols={setAlcohols}
              mixers={mixers}
              setMixers={setMixers}
            />
          </AccordionDetails>
        </Box>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography color="primary">Show</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShowDrinks
            drinks={drinks}
            setDrinks={setDrinks}
            updateDrink={updateDrink}
            alcohols={alcohols}
            mixers={mixers}
            updateMixer={updateMixer}
            updateAlcohol={updateAlcohol}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Drinks;
