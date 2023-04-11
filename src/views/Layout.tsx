import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  Drawer,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Link to={"/"}>Home</Link>
            </Typography>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton size="large" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="persistent"
        open={openDrawer}
        anchor="left"
        sx={{ backgroundColor: "green" }}
      >
        <Box p={2} width={"250px"} left={"233px"} top={"64px"}>
          <Typography variant="h5" component={"div"}>
            Hello
          </Typography>
          <Button onClick={handleDrawerClose}>Close</Button>
        </Box>
      </Drawer>
      <Main />
    </>
  );
};

export default Layout;
