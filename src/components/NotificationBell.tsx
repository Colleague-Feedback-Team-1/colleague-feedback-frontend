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
import { UserContextProps } from "../types/types";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationBoard from "./NotificationBoard";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import useNotifications from "../utils/useNotifications";

function NotificationBell() {
  const { user, adminNoti } = useContext<UserContextProps>(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openNotiMenu = Boolean(anchorEl);
  const { notiData, handleChangeNoti, forceReloadNotification } =
    useNotifications();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
