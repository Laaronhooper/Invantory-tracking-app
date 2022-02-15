import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import CreateMixers from "../components/mixers/createMixer";
import ShowMixers from "../components/mixers/showMixers";

const Mixers = ({ mixers, setMixers, updateMixer }) => {
  return (
    <>
      <Box p={3}>
        <Typography align="center" variant="h5" color="primary">
          Mixers
        </Typography>
      </Box>
      <Accordion>
        <AccordionSummary>
          <Typography color="primary">Create</Typography>
        </AccordionSummary>
        <Box display="flex" justifyContent="center">
          <AccordionDetails>
            <CreateMixers mixers={mixers} setMixers={setMixers} />
          </AccordionDetails>
        </Box>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography color="primary">Show</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShowMixers
            mixers={mixers}
            updateMixer={updateMixer}
            setMixers={setMixers}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Mixers;
