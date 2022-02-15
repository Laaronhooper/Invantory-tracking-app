import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../context/globalContext";
import api from "../api/api";

import ShowUsers from "../components/users/showUsers";
import CreateUser from "../components/users/createUser";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const boxStyle = {
  border: 5,
  color: "secondary.main",
  height: 1,
  width: 0.8,
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  borderRadius: "16px",
  minHeight: "300px",
};

const AdminPage = () => {
  const { global } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    if (global.user.admin != true) {
      navigate("/");
    } else {
      const users = await api.getUsers();

      if (users) {
        const sorted = users.sort((a, b) => a.id - b.id);
        setUsers(sorted);
      }
    }
  }, []);

  return (
    <div>
      <Grid container justifyContent="center">
        <Box sx={boxStyle}>
          <CreateUser users={users} setUsers={setUsers} />
          <ShowUsers users={users} setUsers={setUsers} />
        </Box>
      </Grid>
      {/* <CreateUser users={users} setUsers={setUsers} />
      <ShowUsers users={users} setUsers={setUsers} /> */}
    </div>
  );
};

export default AdminPage;
