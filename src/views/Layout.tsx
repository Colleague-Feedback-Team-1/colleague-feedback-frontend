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
  Menu,
  MenuItem, Avatar
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchBar from "../components/SearchBar";
import ExoveEmployee from "../assets/Exove-employee.png";
import ExoveLogoWhite from "../assets/ExoveLogoWhite.png";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const drawerList = [
    {
      text: "Dashboard",
      icon: <AccountCircleIcon />,
      link: "/dashboard",
    },
  ];

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
        console.log(res.data);
        console.log("Log out successfully.");
        setUser(null);
        return <Navigate to={"/login"} replace />;
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
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={5} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleClick}
                  >
                    {/* <img
                      src={ExoveEmployee}
                      alt="Employee"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        border: "1px solid white",
                      }}
                    /> */}
                    <Avatar sx={{ bgcolor: "green", width: "30px",
                        height: "30px" }}>
                      {user?.employeeName.slice(0, 1)}
                    </Avatar>
                  </IconButton>
                </Stack>
              ) : (
                <Typography variant="h5">COLLEAGUE FEEDBACK</Typography>
              )}
            </Box>

            {/* Menu open when click in IconButton */}
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
              <Link to={`/employees/${user?._id}`} {...user}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Stack>

      {/* Drawer in the left side of the screen */}
      <Drawer variant="permanent" open={openDrawer} anchor="left">
        <Box
          p={2}
          width={"170px"}
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
