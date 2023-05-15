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
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { Notification } from "../types/types";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationBoard from "../components/NotificationBoard";
import { useEffect, useState, useContext } from "react";
import { UserContextProps } from "../types/types";
import UserContext from "../context/UserContext";

const AllNotifications = () => {
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
      <Stack p={"30px"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" textAlign={"left"}>
            All notifications ({notiData.length})
          </Typography>
          <Box>
            {user?.description === "HR" ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={adminNoti} onChange={handleChangeNoti} />
                  }
                  label="Admin"
                />
              </FormGroup>
            ) : (
              <></>
            )}
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={forceReloadNotification}
              sx={{
                margin: "10px",
              }}
            >
              Refresh
            </Button>
          </Box>
        </Stack>

        <Stack
          sx={{
            width: "80%",
            padding: "15px",
            backgroundColor: "#ffdbeb",
          }}
        >
          <NotificationBoard data={notiData} adminNoti={adminNoti} />
        </Stack>
      </Stack>
    );
  };

  return <>{renderMenu()}</>;
};
export default AllNotifications;
