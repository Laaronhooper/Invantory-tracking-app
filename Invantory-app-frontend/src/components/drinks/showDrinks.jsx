import api from "../../api/api";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddToDrinkSold from "./addToDrinkSold";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { Stack } from "@mui/material";

import EditDrink from "./editDrink";
import DeleteButton from "../sharedComponents/deleteButton";

const ShowDrinks = ({
  drinks,
  updateDrink,
  setDrinks,
  alcohols,
  mixers,
  updateMixer,
  updateAlcohol,
}) => {
  const deleteAPI = api.deleteDrink;

  const alcoholName = (d) => {
    if (alcohols.length > 0) {
      const foundAlcohol = alcohols.find(
        (alcohol) => alcohol.id === d.alcohol_id
      );
      return foundAlcohol.name;
    }
  };

  const mixerName = (m) => {
    if (mixers.length > 0) {
      const foundMixer = mixers.find((mixer) => mixer.id === m.mixer_id);
      return foundMixer.name;
    }
  };

  return (
    <>
      <TableContainer
        sx={{
          height: 500,
        }}
      >
        <Table
          sx={{ minWidth: 650, bgcolor: "primary", height: "max-content" }}
          aria-label="simple table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Alcohol</TableCell>
              <TableCell align="center">Alcohol Required</TableCell>
              <TableCell align="center">Mixer</TableCell>
              <TableCell align="center">Mixer Required</TableCell>
              <TableCell align="center">Amount Sold</TableCell>
              <TableCell align="center">Sell</TableCell>
              <TableCell align="center">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drinks != null
              ? drinks.map((drink, i) => (
                  <TableRow key={i} hover>
                    <TableCell align="center">{drink.name}</TableCell>
                    <TableCell align="center">{alcoholName(drink)}</TableCell>
                    <TableCell align="center">{drink.alcohol_amount}</TableCell>
                    <TableCell align="center">{mixerName(drink)}</TableCell>
                    <TableCell align="center">{drink.mixer_amount}</TableCell>
                    <TableCell align="center">{drink.number_sold}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center">
                        <Stack spacing={2} direction="row">
                          <AddToDrinkSold
                            alcohols={alcohols}
                            mixers={mixers}
                            drink={drink}
                            updateMixer={updateMixer}
                            updateAlcohol={updateAlcohol}
                            updateDrink={(updatedDrink) =>
                              updateDrink(i, updatedDrink)
                            }
                          />
                        </Stack>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center">
                        <Stack
                          spacing={2}
                          direction="row"
                          divider={<Divider orientation="vertical" flexItem />}
                        >
                          <EditDrink
                            drink={drink}
                            alcohols={alcohols}
                            mixers={mixers}
                            updateDrink={(updatedDrink) =>
                              updateDrink(i, updatedDrink)
                            }
                          />
                          <DeleteButton
                            item={drink}
                            items={drinks}
                            setItems={setDrinks}
                            deleteAPI={deleteAPI}
                          />
                        </Stack>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowDrinks;
