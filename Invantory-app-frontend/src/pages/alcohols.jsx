import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import CreateAlcohols from "../components/alcohols/createAlcohol";
import ShowAlcohols from "../components/alcohols/showAlcohols";

const Alcohols = ({ alcohols, setAlcohols, updateAlcohol }) => {
  return (
    <>
      <Box p={3}>
        <Typography align="center" variant="h5" color="primary">
          Alcohols
        </Typography>
      </Box>
      <Accordion>
        <AccordionSummary>
          <Typography color="primary">Create</Typography>
        </AccordionSummary>
        <Box display="flex" justifyContent="center">
          <AccordionDetails>
            <CreateAlcohols alcohols={alcohols} setAlcohols={setAlcohols} />
          </AccordionDetails>
        </Box>
      </Accordion>

      <Accordion>
        <AccordionSummary justify-justifyContent="center">
          <Typography color="primary">Show</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShowAlcohols
            alcohols={alcohols}
            updateAlcohol={updateAlcohol}
            setAlcohols={setAlcohols}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Alcohols;
