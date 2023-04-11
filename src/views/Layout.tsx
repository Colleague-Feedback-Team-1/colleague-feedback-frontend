import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerList = [
    {
      text: "Admin",
      icon: <AdminPanelSettingsIcon />,
      link: "/admin",
    },
    {
      text: "User",
      icon: <AccountCircleIcon />,
      link: "/user",
    },
  ];

  const handleDrawer = () => {
    if (openDrawer) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ zIndex: "1400" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawer}
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
        variant="permanent"
        open={openDrawer}
        anchor="left"
      >
        <Box p={2} width={"150px"} sx={{ marginTop: "64px" }}>
          <List>
            {drawerList.map((item) => {
              const { text, icon, link } = item;
              return (
                <Link to={link}>
                  <ListItem key={text} divider>
                    {icon && <ListItemIcon> {icon}</ListItemIcon>}
                    <ListItemText>{text}</ListItemText>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Main />
    </>
  );
};

export default Layout;
