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

  const fetchData = async () => {
    try {
      let response;
      const apiUrl = "http://localhost:4500/api/notifications/";

      if (user?.description === "HR" && adminNoti) {
        response = await axios.get(apiUrl);
      } else {
        response = await axios.get(`${apiUrl}by-receiver/${user?._id}`);
      }

      setNotiData(response.data.reverse());
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
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
