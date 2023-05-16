import { Typography, Card, CardHeader, Avatar, Button } from "@mui/material";
import { Notification } from "../../types/types";
import { getTodayDate } from "../../utils/formatDate";
import { CardStyle, CardSubheader } from "./constant";
import useNotifications from "../../utils/useNotifications";
import ExoveLogo from "../../assets/ExoveLogoSquareBlack.jpeg";
import { Link } from "react-router-dom";

type ConfirmedByAdminCardProps = {
  noti: Notification;
};

const ConfirmedByAdminCard = ({ noti }: ConfirmedByAdminCardProps) => {
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
                An admin has confirmed the request for{" "}
                <span style={{ color: "#9b51e0" }}>
                  {noti.receiver[0].receiverName}
                </span>
                .
              </b>
            ) : (
              <>
                <b>An admin has confirmed your request.</b> Your reviewers{" "}
                <br></br>and manager can give their feedback now.
              </>
            )}
          </Typography>
        }
        subheader={CardSubheader(noti.date)}
        action={
          <Link to={`/requests/${noti.requestid}`}>
            <Button variant="contained">View request</Button>
          </Link>
        }
      ></CardHeader>
    </Card>
  );
};

export default ConfirmedByAdminCard;
