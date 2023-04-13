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
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchBar from "../components/SearchBar";
import ExoveEmployee from "../assets/Exove-employee.png";
import ExoveLogo from "../assets/ExoveLogo.png";
import ExoveLogoWhite from "../assets/ExoveLogoWhite.png";
import ExoveLogoO from "../assets/ExoveLogoO.png";

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
      link: "/dashboard",
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
      <Stack>
        <AppBar
          position="fixed"
          sx={{ zIndex: "1400", backgroundColor: "black" }}
        >
          <Toolbar>
            <Stack
              direction={"row"}
              sx={{ width: "70%", alignItems: "center" }}
            >
              <Link to={"/"}>
                <IconButton disableRipple>
                  <img
                    src={ExoveLogoWhite}
                    alt="Exove company logo"
                    style={{
                      width: "138px",
                      height: "30px",
                      backgroundColor: "none",
                    }}
                  />
                </IconButton>
              </Link>
            </Stack>

            <Stack
              direction={"row"}
              sx={{ alignItems: "center", justifyContent: "right" }}
            >
              <SearchBar />
              <IconButton size="large" color="inherit">
                <Badge badgeContent={5} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <img
                  src={ExoveEmployee}
                  alt="Employee"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    border:'1px solid white'
                  }}
                />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Stack>
      <Drawer variant="permanent" open={openDrawer} anchor="left" sx={{}}>
        <Box
          p={2}
          width={"150px"}
          minHeight={"89.6vh"}
          sx={{ marginTop: "64px", backgroundColor: "#9b51e0", color: "white" }}
        >
          <List>
            {drawerList.map((item) => {
              const { text, icon, link } = item;
              return (
                <Link to={link} key={text}>
                  <ListItem key={text} divider>
                    {icon && (
                      <ListItemIcon sx={{ color: "white" }}>
                        {icon}
                      </ListItemIcon>
                    )}
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
