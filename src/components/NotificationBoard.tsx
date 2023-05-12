import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Notification } from "../types/types";
import ExoveLogo from "../assets/ExoveLogoSquareBlack.jpeg";

interface NotificationBoardProps {
  data: Notification[];
}

const NotificationBoard = ({ data }: NotificationBoardProps) => {
  console.log(data);
  const renderNotifications = () => {
    return data?.map((noti) => {
      // remember to add key as Mongo _id to MenuItem
      switch (noti.type) {
        case "create-new-request":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
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
                        {noti.sender[0].senderName} has created a new request.{" "}
                      </b>
                      You can confirm <br /> or deny it from the dashboard.
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Button variant="contained">
                      <Link to={"/dashboard"}>View Dashboard</Link>
                    </Button>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );
        case "denied-by-admin":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={ExoveLogo} />}
                  title={
                    <Typography>
                      <b>An admin has denied your request.</b> Try create a new
                      request <br></br> or contact admin for more information.
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                ></CardHeader>
              </Card>
            </MenuItem>
          );
        case "confirmed-by-admin":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={ExoveLogo} />}
                  title={
                    <Typography>
                      <b>An admin has confirmed your request.</b> Your reviewers{" "}
                      <br></br>and manager can give their feedback now.
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Link to={`/requests/${noti.requestid}`}>
                      <Button variant="contained">View request</Button>
                    </Link>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );

        case "feedback-submitted":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
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
                        {noti.sender[0].senderName} has submitted a feedback for
                        you.
                      </b>
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Link to={`/requests/${noti.requestid}`}>
                      <Button variant="contained">View request</Button>
                    </Link>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );
        case "remind-create-request":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={ExoveLogo}></Avatar>}
                  title={
                    <Typography>
                      <b>
                        [Reminder] You have not yet created a<br />
                        feedback for yourself.{" "}
                      </b>
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Link to={`/requests/createNewRequest`}>
                      <Button variant="contained">Create new Request</Button>
                    </Link>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );
        case "remind-self-review":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={ExoveLogo}></Avatar>}
                  title={
                    <Typography>
                      <b>[Reminder] You have not yet reviewed yourself. </b>
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Link to={`/requests/${noti.requestid}`}>
                      <Button variant="contained">View request</Button>
                    </Link>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );
        case "remind-give-feedback":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={ExoveLogo}></Avatar>}
                  title={
                    <Typography>
                      <b>
                        [Reminder] {noti.sender[0].senderName} still need your
                        feedback.{" "}
                      </b>
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Link to={`/requests/${noti.requestid}`}>
                      <Button variant="contained">View request</Button>
                    </Link>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );
        case "ask-for-feedback":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  minWidth: "700px",
                  maxWidth: "100%",
                  backgroundColor: "#d0e8ff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={ExoveLogo}></Avatar>}
                  title={
                    <Typography>
                      <b>
                        {noti.sender[0].senderName} is asking for your feedback.{" "}
                      </b>
                    </Typography>
                  }
                  subheader={new Date(noti.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  action={
                    <Link to={`/requests/${noti.requestid}`}>
                      <Button variant="contained">View request</Button>
                    </Link>
                  }
                ></CardHeader>
              </Card>
            </MenuItem>
          );
      }
    });
  };
  return <div>{renderNotifications()}</div>;
};

export default NotificationBoard;
