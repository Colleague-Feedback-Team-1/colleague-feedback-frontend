import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContextProps, Notification } from "../types/types";
import UserContext from "../context/UserContext";

interface UseNotificationsProps {
  notiData: Notification[];
  adminNoti: boolean;
  handleChangeNoti: () => void;
  forceReloadNotification: () => void;
}

const useNotifications = (): UseNotificationsProps => {
  const [notiData, setNotiData] = useState<Notification[]>([]);
  const { user } = useContext<UserContextProps>(UserContext);
  const [reloadCount, setReloadCount] = useState<number>(0);
  const [adminNoti, setAdminNoti] = useState<boolean>(true);

  const handleChangeNoti = () => {
    setAdminNoti((prevState) => !prevState);
  };

  useEffect(() => {
    const apiUrl = "http://localhost:4500/api/notifications/";
    if (user?.description === "HR" && adminNoti) {
      axios
        .get(apiUrl)
        .then((res) => setNotiData(res.data.reverse()))
        .catch((err) => console.error(err));
    } else {
      axios
        .get(`${apiUrl}by-receiver/${user?._id}`)
        .then((res) => setNotiData(res.data.reverse()))
        .catch((err) => console.error(err));
    }
  }, [reloadCount, adminNoti, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReloadCount((prevCount) => prevCount + 1);
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, [reloadCount]);

  const forceReloadNotification = () => {
    setReloadCount((prevCount) => prevCount + 1);
  };

  return {
    notiData,
    adminNoti,
    handleChangeNoti,
    forceReloadNotification,
  };
};

export default useNotifications;
