import { Button, Typography } from "@mui/material";
import { getTodayDate } from "../utils/formatDate";
import axios from "axios";

const NotiTestGround = () => {
  // get the current date and time
  const currentDate = new Date();

  // format the date in the desired format
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate); // outputs something like "2023-05-10"

  const rejectRequest = async () => {
     let today = getTodayDate()
      const notification = {
        type: "denied-by-admin",
        date: today,
        receiver: [
          {
            receiverid: "6441133714d75de5fb40b5fd",
            receiverName: "Dang Le",
          },
        ],
        sender: [
          {
            senderid: "Admin",
            senderName: "Admin",
          },
        ],
        requestid: null,
      };
      ;
   console.log(notification)
   axios
     .post(
       "http://localhost:4500/api/notifications/insert-notification",
       notification
     )
     .then((res) => console.log(res));
  };
  return (
    <>
      <Typography variant="h3">NotiTestGround</Typography>
      <Button onClick={rejectRequest}>Test</Button>
    </>
  );
};

export default NotiTestGround;
