import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import NotificationBoard from "./NotificationBoard";
import { useState, useEffect } from "react";
import { Notification } from "../types/types";

const NotiTestGround = () => {
  const [notiData, setNotiData] = useState<Notification[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:4500/api/notifications/").then((res) => {
      setNotiData(res.data.reverse());
    });
  }, [reloadCount]);

  // make the component reload to fetch new noti
  useEffect(() => {
    const timer = setTimeout(() => {
      setReloadCount(reloadCount + 1);
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, [reloadCount]);
  return (
    <>
      <Typography variant="h3">All notifications</Typography>
      <Stack alignItems={"center"} textAlign={"left"}>
        <NotificationBoard data={notiData} />
      </Stack>
    </>
  );
};

export default NotiTestGround;
