import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserContextProps } from "../types/types";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import useNotifications from "../utils/useNotifications";

function NotificationBell() {
  const { todayNoti } = useContext<UserContextProps>(UserContext);
  
  return (
    <>
      <Badge badgeContent={todayNoti} color="error">
        <NotificationsIcon />
      </Badge>
    </>
  );
}

export default NotificationBell;
