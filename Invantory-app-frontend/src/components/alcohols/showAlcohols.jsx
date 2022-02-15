import React, { useState } from "react";
import api from "../../api/api";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

import EditButton from "../sharedComponents/editButton";
import DeleteButton from "../sharedComponents/deleteButton";

const styles = {
  searchContainer: { display: "flex", borderColor: "error.main" },
  searchIcon: { paddingTop: "2rem" },
  searchField: {
    borderColor: "error.main",
    paddingTop: "0.5rem",
    marginTop: "0.5rem",
    width: "30%",
  },
};

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  width: "90%",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
};

const ShowAlcohols = ({ alcohols, updateAlcohol, setAlcohols }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const editAPI = api.editAlcohol;
  const deleteAPI = api.deleteAlcohol;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ ...commonStyles, justifyContent: "center" }}>
          <SearchOutlinedIcon sx={styles.searchIcon} />
          <TextField
            sx={styles.searchField}
            id="filled-basic"
            label="Search..."
            variant="filled"
            size="small"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </Box>
      </Box>
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
              <TableCell align="center">Volume in ml</TableCell>
              <TableCell align="center">Critical Volume</TableCell>
              <TableCell align="center">Stock Status</TableCell>
              <TableCell align="center">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-cy="table-body">
            {alcohols != null
              ? alcohols
                  .filter((alcohol) => {
                    if (searchTerm == "") {
                      return alcohol;
                    } else if (
                      alcohol.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return alcohol;
                    }
                  })
                  .map((alcohol, i) => (
                    <TableRow key={i} hover data-cy="table-row">
                      <TableCell align="center">{alcohol.name}</TableCell>
                      <TableCell align="center">
                        {alcohol.volume_in_ml}
                      </TableCell>
                      <TableCell align="center">
                        {alcohol.critical_volume}
                      </TableCell>
                      <TableCell align="center">
                        {alcohol.critical_volume > alcohol.volume_in_ml
                          ? "Low Stock"
                          : "In Stock"}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Stack
                            spacing={2}
                            direction="row"
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                          >
                            <EditButton
                              item={alcohol}
                              updateItem={(updatedAlcohol) =>
                                updateAlcohol(i, updatedAlcohol)
                              }
                              editAPI={editAPI}
                            />
                            <DeleteButton
                              item={alcohol}
                              items={alcohols}
                              setItems={setAlcohols}
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

export default ShowAlcohols;
