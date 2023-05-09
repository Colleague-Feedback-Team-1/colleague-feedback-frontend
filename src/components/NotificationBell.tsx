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
  const [notiData, setNotiData] = useState<Notification[] | null>();
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
    axios.get("http://localhost:3001/notification").then((res) => {
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
          <>
            {notiData?.map((noti) => {
              // remember to add key as Mongo _id to MenuItem
              switch (noti.type) {
                case "create-new-request":
                  return (
                    <MenuItem>
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
                              {noti.sender[0].employeeName.slice(0, 1)}
                            </Avatar>
                          }
                          title={
                            <Typography>
                              <b>
                                {noti.sender[0].employeeName} has created a new
                                request.{" "}
                              </b>
                              You can confirm <br /> or deny it from the
                              dashboard.
                            </Typography>
                          }
                          subheader={noti.date}
                          action={
                            <Button variant="contained">
                              <Link to={"/dashboard"}>View</Link>
                            </Button>
                          }
                        ></CardHeader>
                      </Card>
                    </MenuItem>
                  );
                case "denied-by-admin":
                  return (
                    <MenuItem>
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
                              <b>An admin has denied your request.</b> Try
                              create a new request <br></br> or contact admin
                              for more information.
                            </Typography>
                          }
                          subheader={noti.date}
                        ></CardHeader>
                      </Card>
                    </MenuItem>
                  );
                case "confirmed-by-admin":
                  return (
                    <MenuItem>
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
                              <b>An admin has confirmed your request.</b> Your
                              reviewers <br></br>and manager can give their
                              feedback now.
                            </Typography>
                          }
                          subheader={noti.date}
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
                    <MenuItem>
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
                              {noti.sender[0].employeeName.slice(0, 1)}
                            </Avatar>
                          }
                          title={
                            <Typography>
                              <b>
                                {noti.sender[0].employeeName} has submitted a
                                feedback for you.
                              </b>
                            </Typography>
                          }
                          subheader={noti.date}
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
                    <MenuItem>
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
                          subheader={noti.date}
                          action={
                            <Link to={`/requests/createNewRequest`}>
                              <Button variant="contained">
                                Create new Request
                              </Button>
                            </Link>
                          }
                        ></CardHeader>
                      </Card>
                    </MenuItem>
                  );
                case "remind-self-review":
                  return (
                    <MenuItem>
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
                                [Reminder] You have not yet reviewed yourself.{" "}
                              </b>
                            </Typography>
                          }
                          subheader={noti.date}
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
                    <MenuItem>
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
                                [Reminder] {noti.sender[0].employeeName} still
                                need your feedback.{" "}
                              </b>
                            </Typography>
                          }
                          subheader={noti.date}
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
                    <MenuItem>
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
                                {noti.sender[0].employeeName} is asking for your
                                feedback.{" "}
                              </b>
                            </Typography>
                          }
                          subheader={noti.date}
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
            })}
          </>
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
