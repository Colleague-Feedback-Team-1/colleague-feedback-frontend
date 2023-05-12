import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Notification } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationBoard from "./NotificationBoard";
import { useEffect, useState, useContext } from "react";
import { UserContextProps } from "../types/types";
import UserContext from "../context/UserContext";

function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openNotiMenu = Boolean(anchorEl);
  const [notiData, setNotiData] = useState<Notification[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  const { user } = useContext<UserContextProps>(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user?.description === "HR") {
      axios.get("http://localhost:4500/api/notifications/").then((res) => {
        setNotiData(res.data.reverse());
      });
    } else {
      axios
        .get(`http://localhost:4500/api/notifications/by-receiver/${user?._id}`)
        .then((res) => {
          setNotiData(res.data.reverse());
        });
    }
  }, [reloadCount]);

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
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={forceReloadNotification}
          >
            Refresh
          </Button>
          <NotificationBoard data={notiData} />
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
