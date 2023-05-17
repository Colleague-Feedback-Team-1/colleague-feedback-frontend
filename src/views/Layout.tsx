import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  Stack,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import ExoveLogoWhite from "../assets/ExoveLogoWhite.png";
import UserContext from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import LanguageSelector from "../components/LanguageSelector";
import ExoveLogo from "../assets/Exove-employee.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { t } = useTranslation();

  const drawerList = [
    {
      text: t("Layout.dashboard"),
      icon: <BarChartIcon />,
      link: "/dashboard",
    },
    {
      text: t("Layout.notifications"),
      icon: <NotificationsIcon />,
      link: "/notification",
    },
  ];

  const renderUser = () => {
    return (
      /* Search bar and menu on the right will be shown to login user only */
      <Stack direction={"row"}>
        <LanguageSelector />

        {user ? (
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"center"}
          >
            <Typography>{user?.displayName}</Typography>
            <IconButton size="large" color="inherit" onClick={handleClick}>
              <Avatar
                sx={{ bgcolor: "#fcb900", width: "30px", height: "30px" }}
              >
                {user?.displayName.slice(0, 1)}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
              <Link to={`/employees/${user?._id}`} {...user}>
                <MenuItem>{t("Layout.profile")}</MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>{t("Layout.logout")}</MenuItem>
            </Menu>
          </Stack>
        ) : (
          <>
            <LanguageSelector />
            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={"center"}
            >
              <Typography>{t("Layout.user")}</Typography>
              <IconButton size="large" color="inherit" onClick={handleClick}>
                <Avatar
                  src={ExoveLogo}
                  sx={{ bgcolor: "#fcb900", width: "30px", height: "30px" }}
                ></Avatar>
              </IconButton>
            </Stack>
          </>
        )}
      </Stack>
    );
  };

  const renderDrawer = () => {
    return (
      <Stack justifyContent={"flex-end"}>
        {drawerList.map((item) => {
          const { text, icon, link } = item;
          return (
            <Link to={link} key={text}>
              <ListItem key={text} divider>
                <IconButton sx={{ color: "white", paddingRight: "0.7em" }}>
                  {icon}
                </IconButton>
                <Typography>{text}</Typography>
              </ListItem>
            </Link>
          );
        })}
      </Stack>
    );
  };

  /* Open and Close function for menu under profile avatar */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  /* Log out function for the menu under profile avatar */
  const handleLogOut = () => {
    setTimeout(() => {
      axios.post("http://localhost:4500/api/employees/logout").then((res) => {
        setUser(null);
        toast.success("Log out successfully");
        handleClose();
      });
    }, 1000);
  };

  return (
    <>
      <Stack>
        {/* AppBar always at the top */}
        <AppBar
          position="fixed"
          sx={{ zIndex: "1400", backgroundColor: "black", height: "64px" }}
        >
          <Toolbar>
            <Stack
              direction={"row"}
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction={"row"} alignItems={"center"}>
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

              {renderUser()}
            </Stack>
          </Toolbar>

          {/* Menu open when click in IconButton */}
        </AppBar>
      </Stack>

      {/* Drawer in the left side of the screen */}
      {user !== null ? (
        <Drawer variant="permanent" anchor="left">
          <Box
            p={2}
            minHeight={"calc(100vh - 96px)"}
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
