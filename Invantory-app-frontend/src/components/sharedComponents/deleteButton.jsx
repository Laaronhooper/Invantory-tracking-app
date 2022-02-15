import { useContext, useEffect, useState } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";

import api from "../../api/api";
import GlobalContext from "../../context/globalContext";
import Banner from "../banner";

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

const DeleteButton = ({ item, items, setItems, deleteAPI }) => {
  const { global } = useContext(GlobalContext);
  const { id } = item;

  const handleClick = async (e) => {
    e.preventDefault();
    await deleteAPI(
      id,
      global.user.jwt,
      (data) => {
        const newAlcoholsList = [...items].filter((a) => a.id != item.id);

        setItems(newAlcoholsList);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <Button
        sx={{ borderRadius: 16, display: "inline" }}
        variant="outlined"
        onClick={handleClick}
      >
        <ClearTwoToneIcon />
      </Button>
    </div>
  );
};

export default DeleteButton;
