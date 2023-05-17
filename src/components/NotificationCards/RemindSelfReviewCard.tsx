import { Typography, Card, CardHeader, Avatar, Button } from "@mui/material";
import { Notification, UserContextProps } from "../../types/types";
import { getTodayDate } from "../../utils/formatDate";
import { CardStyle, CardSubheader } from "./constant";
import ExoveLogo from "../../assets/ExoveLogoSquareBlack.jpeg";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

type RemindSelfReviewCardProps = {
  noti: Notification;
};

const RemindSelfReviewCard = ({ noti }: RemindSelfReviewCardProps) => {
  let today = getTodayDate();
  const { user } = useContext<UserContextProps>(UserContext);
  const { adminNoti } = useContext<UserContextProps>(UserContext);

  return (
    <Card sx={CardStyle(noti.date === today)}>
      <CardHeader
        avatar={<Avatar src={ExoveLogo} />}
        title={
          <Typography>
            {user?.description === "HR" && adminNoti ? (
              <b>
                [Reminder sent] A reminder has been sent to <br />
                <span style={{ color: "#9b51e0" }}>
                  {noti.receiver[0].receiverName}
                </span>{" "}
                to give a self-review.
              </b>
            ) : (
              <>
                <b>[Reminder] You have not yet reviewed yourself.</b>
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

export default RemindSelfReviewCard;
