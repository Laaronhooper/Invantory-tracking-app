import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import GlobalContext from "../context/globalContext";

const ResponsiveAppBar = () => {
  const logOut = () => {
    handleCloseNavMenu();
    setGlobal({});
    navigate("/signin");
  };

  const { global, setGlobal } = useContext(GlobalContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  if (!global || !global.user) {
    return null;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            INVANTOR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="home" onClick={handleCloseNavMenu}>
                <Tab color="red" label="Home" to="/" component={Link} />
              </MenuItem>
              <MenuItem key="alcohols" onClick={handleCloseNavMenu}>
                <Tab
                  color="red"
                  label="Alcohols"
                  to="/alcohols"
                  component={Link}
                />
              </MenuItem>
              <MenuItem key="mixers" onClick={handleCloseNavMenu}>
                <Tab color="red" label="Mixers" to="/mixers" component={Link} />
              </MenuItem>
              <MenuItem key="drinks" onClick={handleCloseNavMenu}>
                <Tab color="red" label="Drinks" to="/drinks" component={Link} />
              </MenuItem>
              {global.user.admin === true ? (
                <MenuItem key="admin" onClick={handleCloseNavMenu}>
                  <Tab color="red" label="Admin" to="/admin" component={Link} />
                </MenuItem>
              ) : null}
              <MenuItem key="logout" onClick={logOut}>
                <Tab
                  color="red"
                  label="Sign Out"
                  to="/signin"
                  component={Link}
                />
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            INVANTOR
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-between",
              },
            }}
          >
            <Box>
              <Tab color="red" label="Home" to="/" component={Link} />
              <Tab
                color="red"
                label="Alcohols"
                to="/alcohols"
                component={Link}
              />
              <Tab color="red" label="Mixers" to="/mixers" component={Link} />
              <Tab color="red" label="Drinks" to="/drinks" component={Link} />
              {global.user.admin === true ? (
                <Tab color="red" label="Admin" to="/admin" component={Link} />
              ) : null}
            </Box>
            <Box>
              <Tab
                color="red"
                label="Sign Out"
                to="/signin"
                component={Link}
                onClick={logOut}
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
