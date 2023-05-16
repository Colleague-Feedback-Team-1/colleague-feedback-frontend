import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { Stack } from "@mui/system";
import { Request } from "../types/types";
import { Link } from "react-router-dom";
import React from "react";

const RequestCard: React.FC<Request> = (prop) => {
  const givenFeedback = prop.reviewers.filter(
    (reviewer) => reviewer.feedbackSubmitted
  ).length;
  return (
    <Card
      sx={{ backgroundColor: "#4CA85A", color: "white", minWidth: "260px" }}
    >
      <CardHeader
        title={`ID ${prop._id.slice(0, 5)}...${prop._id.slice(-5)}`}
      ></CardHeader>
      <CardContent sx={{minHeight:'70px'}}>
        <Typography fontWeight={"bold"}>
          Reviewee: {prop.employeeName}
        </Typography>
        {prop.confirmedByHR ? (
          <Stack>
            <Stack direction={"row"}>
              <CheckCircleIcon color="success" />
              <Typography>Confirmed by HR</Typography>
            </Stack>
            <Typography>
              Feedback: {givenFeedback}/{prop.reviewers.length}
            </Typography>
          </Stack>
        ) : (
          <Stack direction={"row"}>
            <BlockIcon color="disabled" />
            <Typography>Not yet confirmed by HR</Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            width: "100%",
          }}
        >
          <Link
            to={`/requests/${prop._id}`}
            style={{ textDecoration: "none", paddingRight: "13px" }}
          >
            <Button variant="contained">View</Button>
          </Link>

          <Button variant="contained">Quick remind</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
