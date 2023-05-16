import { Typography, Card, CardHeader, Avatar, Button } from "@mui/material";
import { Notification } from "../../types/types";
import { getTodayDate } from "../../utils/formatDate";
import { CardStyle, CardSubheader } from "./constant";
import useNotifications from "../../utils/useNotifications";
import ExoveLogo from "../../assets/ExoveLogoSquareBlack.jpeg";
import { Link } from "react-router-dom";

type RemindCreateRequestCardProps = {
  noti: Notification;
};

const RemindCreateRequestCard = ({ noti }: RemindCreateRequestCardProps) => {
  let today = getTodayDate();

  const { adminNoti } = useNotifications();

  return (
    <Card sx={CardStyle(noti.date === today)}>
      <CardHeader
        avatar={<Avatar src={ExoveLogo} />}
        title={
          <Typography>
            {adminNoti ? (
              <b>
                [Reminder sent] A reminder has been sent to <br />
                <span style={{ color: "#9b51e0" }}>
                  {noti.receiver[0].receiverName}
                </span>{" "}
                to create a new request.
              </b>
            ) : (
              <>
                <b>
                  [Reminder] You have not yet created a<br />
                  feedback for yourself.
                </b>
              </>
            )}
          </Typography>
        }
        subheader={CardSubheader(noti.date)}
        action={
          <Link to={`/requests/createNewRequest`}>
            <Button variant="contained">Create new Request</Button>
          </Link>
        }
      ></CardHeader>
    </Card>
  );
};

export default RemindCreateRequestCard;
