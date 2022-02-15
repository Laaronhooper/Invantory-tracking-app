import React, { useState } from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Input,
} from "@mui/material";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Banner from "../banner";
import api from "../../api/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateUser = (props) => {
  const { users, setUsers } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setBannerOpen(false);
    setFormData({
      username: "",
      password: "",
      password_confirmation: "",
      admin: false,
    });
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    admin: false,
  });

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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBox = (e) => {
    const adminStatus = formData.admin;

    setFormData({ ...formData, admin: !adminStatus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await api.createUser(
      formData.username,
      formData.password,
      formData.password_confirmation,
      formData.admin,
      (message, data) => {
        setUsers([...users, data]);
        handleBannerOpen("success", message);
      },
      (errorMessage) => {
        handleBannerOpen("error", errorMessage);
        setFormData({
          username: "",
          password: "",
          password_confirmation: "",
          admin: false,
        });
      }
    );
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Typography variant="h5">Create Users</Typography>
      </Box>
      <Box>
        <Button variant="outlined" onClick={handleOpen}>
          <PersonAddOutlinedIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-cy="create-user"
        >
          <Box sx={{ ...style, borderRadius: "16px" }}>
            <Banner
              bannerOpen={bannerOpen}
              bannerDisplay={bannerDisplay}
              setBannerOpen={setBannerOpen}
            />
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Typography htmlFor="username">Username</Typography>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username.."
                  value={formData.username}
                  onChange={handleChange}
                  data-cy="username"
                />
                <Typography htmlFor="password">Password</Typography>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter a Password"
                  value={formData.password}
                  onChange={handleChange}
                  data-cy="password"
                />
                <Typography htmlFor="passwordConfirmation">
                  Password Confirmation
                </Typography>
                <Input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm your password.."
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  data-cy="passwordconfirmation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formData.admin}
                      onChange={handleCheckBox}
                      name="admin"
                    />
                  }
                  label="Admin"
                />

                <div>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </div>
              </FormGroup>
            </form>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default CreateUser;
