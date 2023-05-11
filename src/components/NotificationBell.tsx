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
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { Notification } from "../types/types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ExoveLogo from "../assets/ExoveLogoSquareBlack.jpeg";
import RefreshIcon from "@mui/icons-material/Refresh";

function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openNotiMenu = Boolean(anchorEl);
  const [notiData, setNotiData] = useState<Notification[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [isLoadingNoti, setIsLoadingNoti] = useState(false);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get("http://localhost:4500/api/notifications/").then((res) => {
      setNotiData(res.data);
    });
  }, [reloadCount]);

  // make the component reload to fetch new noti
  useEffect(() => {
    const timer = setTimeout(() => {
      setReloadCount(reloadCount + 1);
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, [reloadCount]);

  const forceReloadNotification = () => {
    setReloadCount(reloadCount + 1);
  };

  // function to render all notifications
  const renderNotifications = () => {
    return notiData?.map((noti) => {
      // remember to add key as Mongo _id to MenuItem
      switch (noti.type) {
        case "create-new-request":
          return (
            <MenuItem key={noti._id}>
              <Card
                sx={{
                  width: "700px",
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
                  width: "700px",
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
                  width: "700px",
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
                  width: "700px",
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
                  width: "700px",
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
                  width: "700px",
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
                  width: "700px",
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
                  width: "700px",
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

  const renderMenu = () => {
    return (
      <Menu
        open={openNotiMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ maxHeight: "80vh", marginTop: "10px" }}
      >
        <Stack>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={forceReloadNotification}
          >
            Refresh
          </Button>
          <>{renderNotifications()}</>
          <Box>
            <Link to={"/notification"}>
              <Button>See all Notifications</Button>
            </Link>
          </Box>
        </Stack>
      </Menu>
    );
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleClick}
        sx={{ alignItems: "flex-end" }}
      >
        <Badge badgeContent={notiData?.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {renderMenu()}
    </>
  );
}

export default NotificationBell;
