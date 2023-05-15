import {
  Badge,
  IconButton,
  Menu,
  Button,
  Stack,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Notification, UserContextProps } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationBoard from "./NotificationBoard";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openNotiMenu = Boolean(anchorEl);
  const [notiData, setNotiData] = useState<Notification[]>([]);
  const { user } = useContext<UserContextProps>(UserContext);
  const [reloadCount, setReloadCount] = useState(0);
  const [adminNoti, setAdminNoti] = useState<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeNoti = () => {
    if (adminNoti === false) {
      setAdminNoti(true);
    } else {
      setAdminNoti(false);
    }
  };

  useEffect(() => {
    if (user?.description === "HR") {
      if (adminNoti) {
        axios.get("http://localhost:4500/api/notifications/").then((res) => {
          setNotiData(res.data.reverse());
        });
      } else {
        axios
          .get(
            `http://localhost:4500/api/notifications/by-receiver/${user?._id}`
          )
          .then((res) => {
            setNotiData(res.data.reverse());
          });
      }
    } else {
      setAdminNoti(false);
      axios
        .get(`http://localhost:4500/api/notifications/by-receiver/${user?._id}`)
        .then((res) => {
          setNotiData(res.data.reverse());
        });
    }
  }, [reloadCount, adminNoti]);

  // make the component reload to fetch new noti
  useEffect(() => {
    const timer = setTimeout(() => {
      setReloadCount(reloadCount + 1);
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, [reloadCount]);

  const forceReloadNotification = () => {
    setReloadCount(reloadCount + 1);
  };

  const renderMenu = () => {
    return (
      <Menu
        open={openNotiMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ maxHeight: "80vh", marginTop: "10px" }}
      >
        <Stack>
          {user?.description === "HR" ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={adminNoti} onChange={handleChangeNoti} />
                }
                label="Admin Notifications"
              />
            </FormGroup>
          ) : (
            <></>
          )}
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={forceReloadNotification}
          >
            Refresh
          </Button>
          <Stack width={"750px"}>
            <NotificationBoard data={notiData} adminNoti={adminNoti} />
          </Stack>
          <Box>
            <Link to={"/notification"}>
              <Button>See all Notifications</Button>
            </Link>
          </Box>
        </Stack>
      </Menu>
    );
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleClick}
        sx={{ alignItems: "flex-end" }}
      >
        <Badge badgeContent={notiData?.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {renderMenu()}
    </>
  );
}

export default NotificationBell;
