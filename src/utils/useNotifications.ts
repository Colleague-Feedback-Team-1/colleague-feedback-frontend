import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContextProps, Notification } from "../types/types";
import UserContext from "../context/UserContext";
import { getTodayDate } from "./formatDate";

interface UseNotificationsProps {
  notiData: Notification[];
  todayNoti: number;
  handleChangeNoti: () => void;
  forceReloadNotification: () => void;
}

const useNotifications = (): UseNotificationsProps => {
  const [notiData, setNotiData] = useState<Notification[]>([]);
  const { user } = useContext<UserContextProps>(UserContext);
  const { adminNoti, todayNoti } = useContext<UserContextProps>(UserContext);
  const { setAdminNoti, setTodayNoti } =
    useContext<UserContextProps>(UserContext);
  const [reloadCount, setReloadCount] = useState<number>(0);

  const checkTodayNoti = () => {
    let today = getTodayDate();
    let todayNotiCount = 0;
    notiData.map((noti) => {
      if (noti.date == today) {
        todayNotiCount += 1;
      }
    });
    setTodayNoti(todayNotiCount);
  };
  const handleChangeNoti = () => {
    if (adminNoti) {
      setAdminNoti(false);
    } else {
      setAdminNoti(true);
    }
  };
  useEffect(() => {
    const apiUrl = "http://localhost:4500/api/notifications/";
    if (user?.description === "HR" && adminNoti) {
      axios
        .get(apiUrl)
        .then((res) => {
          setNotiData(res.data.reverse());
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .get(`${apiUrl}by-receiver/${user?._id}`)
        .then((res) => {
          setNotiData(res.data.reverse());
        })
        .catch((err) => console.error(err));
    }
  }, [reloadCount, adminNoti, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReloadCount((prevCount) => prevCount + 1);
    }, 30000); // 0.5 minutes
    return () => clearTimeout(timer);
  }, [reloadCount]);

  useEffect(() => {
    checkTodayNoti();
  }, []);
  const forceReloadNotification = () => {
    setReloadCount((prevCount) => prevCount + 1);
  };

  return {
    notiData,
    todayNoti,
    handleChangeNoti,
    forceReloadNotification,
  };
};

export default useNotifications;
