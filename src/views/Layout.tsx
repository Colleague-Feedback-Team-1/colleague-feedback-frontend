import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import SearchBar from "../components/SearchBar";
import ExoveLogoWhite from "../assets/ExoveLogoWhite.png";
import UserContext from "../context/UserContext";
import axios from "axios";

import { toast } from "react-toastify";
import NotificationBell from "../components/NotificationBell";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { t } = useTranslation();

  const drawerList = [
    {
      text: "Dashboard",
      icon: <BarChartIcon />,
      link: "/dashboard",
    },
    {
      text: "Notifications",
      icon: <NotificationsIcon />,
      link: "/notification",
    },
  ];
  const adminDrawerList = [
    {
      text: "Dashboard",
      icon: <BarChartIcon />,
      link: "/dashboard",
    },
    {
      text: "Notifications",
      icon: <NotificationsIcon />,
      link: "/notification",
    },
  ];

  const renderDrawer = () => {
    if (user?.description === "HR") {
      return (
        <>
          {adminDrawerList.map((item) => {
            const { text, icon, link } = item;
            return (
              <Link to={link} key={text}>
                <ListItem key={text} divider>
                  {icon && (
                    <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                  )}
                  <ListItemText>{text}</ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {drawerList.map((item) => {
            const { text, icon, link } = item;
            return (
              <Link to={link} key={text}>
                <ListItem key={text} divider>
                  {icon && (
                    <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                  )}
                  <ListItemText>{text}</ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </>
      );
    }
  };

  /* Open and Close function for menu under profile avatar */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* Log out function for the menu under profile avatar */
  const handleLogOut = () => {
    setTimeout(() => {
      axios.post("http://localhost:4500/api/employees/logout").then((res) => {
        setUser(null);
        toast.success("Log out successfully");
      });
    }, 1000);
  };

  return (
    <>
      {/* AppBar always at the top */}
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

            {/* Search bar and menu on the right will be shown to login user only */}
            <Box
              sx={{
                width: "100%",
                textAlign: "right",
              }}
            >
              {user ? (
                <Stack
                  direction={"row"}
                  sx={{ alignItems: "center", justifyContent: "right" }}
                >
                  <SearchBar />
                  
                  <NotificationBell />
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={5} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <LanguageSelector/>

                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleClick}
                  >
                    <Avatar
                      sx={{ bgcolor: "#fcb900", width: "30px", height: "30px" }}
                    >
                      {user?.displayName.slice(0, 1)}
                    </Avatar>
                  </IconButton>
                </Stack>
              ) : (
                <Typography variant="h5">{t("Layout.cFeedback")}</Typography>
              )}
            </Box>

            {/* Menu open when click in IconButton */}
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
              <Link to={`/employees/${user?._id}`} {...user}>
                <MenuItem>{t("Layout.profile")}</MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>{t("Layout.logout")}</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Stack>

      {/* Drawer in the left side of the screen */}
      {user !== null ? (
        <Drawer variant="permanent" anchor="left">
          <Box
            p={2}
            minHeight={"87.3vh"}
            sx={{
              marginTop: "64px",
              backgroundColor: "#9b51e0",
              color: "white",
              overflow: "hidden",
            }}
          >
            <List>{renderDrawer()}</List>
          </Box>
        </Drawer>
      ) : (
        <></>
      )}

      <Main />
    </>
  );
};

export default Layout;
