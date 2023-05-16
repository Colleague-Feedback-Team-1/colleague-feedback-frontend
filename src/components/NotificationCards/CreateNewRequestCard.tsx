import { Typography, Card, CardHeader, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Notification } from "../../types/types";
import { getTodayDate } from "../../utils/formatDate";
import { CardStyle, CardSubheader } from "./constant";

type CreateNewRequestCardProps = {
  noti: Notification;
};

const CreateNewRequestCard = ({ noti }: CreateNewRequestCardProps) => {
  let today = getTodayDate();

  return (
    <Card sx={CardStyle(noti.date === today)}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: "#fcb900",
            }}
          >
            {noti.sender[0].senderName.slice(0, 1)}
          </Avatar>
        }
        title={
          <Typography>
            <b>
              <span style={{ color: "#9b51e0" }}>
                {noti.sender[0].senderName}
              </span>{" "}
              has created a new request.{" "}
            </b>
            You can confirm <br /> or deny it from the dashboard.
          </Typography>
        }
        subheader={CardSubheader(noti.date)}
        action={
          <Button variant="contained">
            <Link to={"/dashboard"}>View Dashboard</Link>
          </Button>
        }
      ></CardHeader>
    </Card>
  );
};

export default CreateNewRequestCard;
