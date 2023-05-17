import { Typography, Card, CardHeader, Avatar, Button } from "@mui/material";
import { Notification, UserContextProps } from "../../types/types";
import { getTodayDate } from "../../utils/formatDate";
import { CardStyle, CardSubheader } from "./constant";
import ExoveLogo from "../../assets/ExoveLogoSquareBlack.jpeg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

type RemindGiveFeedbackCardProps = {
  noti: Notification;
};

const RemindGiveFeedbackCard = ({ noti }: RemindGiveFeedbackCardProps) => {
  const { user } = useContext<UserContextProps>(UserContext);
  let today = getTodayDate();
  const { adminNoti } = useContext<UserContextProps>(UserContext);

  return (
    <Card sx={CardStyle(noti.date === today)}>
      <CardHeader
        action={
          <Link to={`/requests/${noti.requestid}`}>
            <Button variant="contained">View request</Button>
          </Link>
        }
        title={
          <Typography>
            {user?.description === "HR" && adminNoti ? (
              <b>
                [Reminder sent] A reminder has been sent to <br />
                <span style={{ color: "#9b51e0" }}>
                  {noti.receiver.length} employee(s){" "}
                </span>{" "}
                to give feeback for{" "}
                <span style={{ color: "#9b51e0" }}>
                  {noti.sender[0].senderName}
                </span>
                .
              </b>
            ) : (
              <>
                <b>
                  [Reminder]{" "}
                  <span style={{ color: "#9b51e0" }}>
                    {noti.sender[0].senderName}
                  </span>{" "}
                  still need your feedback.{" "}
                </b>
              </>
            )}
          </Typography>
        }
        avatar={<Avatar src={ExoveLogo} />}
        subheader={CardSubheader(noti.date)}
      ></CardHeader>
    </Card>
  );
};

export default RemindGiveFeedbackCard;
