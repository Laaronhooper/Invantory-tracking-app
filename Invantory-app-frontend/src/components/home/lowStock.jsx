import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";

const LowStock = (props) => {
  const { alcohols, mixers } = props;
  const [state, setState] = useState([]);

  const checkLowAlcohol = () => {
    if (!alcohols) {
      return null;
    } else {
      const lowAlcohols = alcohols.filter(
        (alcohol) => alcohol.volume_in_ml < alcohol.critical_volume
      );
      return lowAlcohols;
    }
  };

  const checkLowMixer = () => {
    if (!mixers) {
      return null;
    } else {
      const lowMixers = mixers.filter(
        (mixer) => mixer.volume_in_ml < mixer.critical_volume
      );
      return lowMixers;
    }
  };

  useEffect(() => {
    const combined = checkLowAlcohol().concat(checkLowMixer());
    setState(combined);
  }, [alcohols, mixers]);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Volume", key: "volume_in_ml" },
    { label: "Critical Volume", key: "critical_volume" },
  ];

  const csvExport = {
    filename: "export.csv",
    headers: headers,
    data: state,
  };

  return (
    <Box>
      <Typography align="center" variant="h5" color="primary">
        Low Stock Items
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          height: 400,
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
              <TableCell align="center">Volume</TableCell>
              <TableCell align="center">Critical Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((item, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.volume_in_ml}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.critical_volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" sx={{ mt: 1 }}>
        <DownloadIcon></DownloadIcon>
        <CSVLink {...csvExport} textDecoration="none">
          Export to CSV
        </CSVLink>
      </Button>
    </Box>
  );
};

export default LowStock;
