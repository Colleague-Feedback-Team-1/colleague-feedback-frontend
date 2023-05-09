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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { Notification } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";
import ExoveLogo from "../assets/ExoveLogoSquareBlack.jpeg";

function NotiDemo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openNotiMenu = Boolean(anchorEl);
  const [notiData, setNotiData] = useState<Notification[] | null>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/notification").then((res) => {
      console.log(res.data);
      setNotiData(res.data);
    });
  }, []);

  const renderMenu = () => {
    return (
      <Menu
        open={openNotiMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ maxHeight: "80vh" }}
      >
        <Stack>
          <>
            {notiData?.map((noti) => {
              switch (noti.type) {
                case "create-new-request":
                  return (
                    <MenuItem onClick={handleClose}>
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
                              You can confirm or deny it from the dashboard.
                            </Typography>
                          }
                          subheader={noti.date}
                        ></CardHeader>
                      </Card>
                    </MenuItem>
                  );
                case "denied-by-admin":
                  return (
                    <MenuItem onClick={handleClose}>
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
                    <MenuItem onClick={handleClose}>
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
                    <MenuItem onClick={handleClose}>
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
                    <MenuItem onClick={handleClose}>
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
                    <MenuItem onClick={handleClose}>
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
                    <MenuItem onClick={handleClose}>
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
                    <MenuItem onClick={handleClose}>
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
          <Button>See all Notifications</Button>
        </Stack>
      </Menu>
    );
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Typography>Notifications</Typography>
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
      </Stack>
      {renderMenu()}
    </>
  );
}

export default NotiDemo;

{
  /* Example of all type of noti 
          <MenuItem onClick={handleClose}>
            <Card
              sx={{
                width: "700px",
                backgroundColor: "#d0e8ff",
              }}
            >
              <CardHeader
                avatar={<Avatar>D</Avatar>}
                title={
                  <Typography>
                    <b>An admin has confirmed your request. </b>
                    Reviewers can give
                    <br /> their feedbacks now.
                  </Typography>
                }
                subheader="May 7, 2023"
                action={<Button variant="contained">View</Button>}
              ></CardHeader>
            </Card>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Card
              sx={{
                width: "700px",
                backgroundColor: "#d0e8ff",
              }}
            >
              <CardHeader
                avatar={<Avatar>D</Avatar>}
                title={
                  <Typography>
                    <b>An admin has denied your request</b>. Try create a new
                    request <br />
                    or contact admin for more information.
                  </Typography>
                }
                subheader="May 7, 2023"
                action={<Button variant="contained">View</Button>}
              ></CardHeader>
            </Card>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Card sx={{ width: "700px" }}>
              <CardHeader
                avatar={<Avatar>D</Avatar>}
                title="Ilya asked for your feedback."
                subheader="May 7, 2023"
                action={<Button variant="contained">Give feedback</Button>}
              ></CardHeader>
            </Card>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Card sx={{ width: "700px" }}>
              <CardHeader
                avatar={<Avatar>D</Avatar>}
                title="[Reminder] Ilya still need your feedback."
                subheader="May 7, 2023"
                action={<Button variant="contained">Give feedback</Button>}
              ></CardHeader>
            </Card>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Card sx={{ width: "700px" }}>
              <CardHeader
                avatar={<Avatar>D</Avatar>}
                title="[Reminder] An admin remined you to create a new feedback request for yourself."
                subheader="May 7, 2023"
                action={<Button variant="contained">Create</Button>}
              ></CardHeader>
            </Card>
          </MenuItem> */
}
