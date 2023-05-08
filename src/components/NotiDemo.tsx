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
import { useState } from "react";

function NotiDemo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openNotiMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Stack>

      <Menu open={openNotiMenu} anchorEl={anchorEl} onClose={handleClose}>
        <Stack>
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
          </MenuItem>

          <Button>See all Notifications</Button>
        </Stack>
      </Menu>
    </>
  );
}

export default NotiDemo;
/* Example of noti in db 
{
      "sender": [
        { "senderName": "Dang Le", "senderId": "6441133714d75de5fb40b5fd" }
      ],
      "receiver": [
        {
          "receiverName": "Mark Upton",
          "receiverId": "6441133714d75de5fb40b5f9"
        },
        {
          "receiverName": "Mark Upton",
          "receiverId": "6441133714d75de5fb40b5f9"
        },
        {
          "receiverName": "Mark Upton",
          "receiverId": "6441133714d75de5fb40b5f9"
        },
        {
          "receiverName": "Mark Upton",
          "receiverId": "6441133714d75de5fb40b5f9"
        },
        {
          "receiverName": "Mark Upton",
          "receiverId": "6441133714d75de5fb40b5f9"
        }
      ],
      "type": "create-new-request",
      "date": "05.08.2023"
    }, */
