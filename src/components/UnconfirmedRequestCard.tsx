import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Request } from "../types/types";
import { Link } from "react-router-dom";
import React from "react";

const UnconfirmedRequestCard: React.FC<Request> = (prop) => {
  // convert the time from the time converter to the format that MongoDB accept
  const timeFormatter = (date: any) => {
    const formattedDate = date
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
    return formattedDate;
  };
  return (
    <Card sx={{ backgroundColor: "#ff6900", color: "white" }}>
      <CardHeader
        title={`ID ${prop._id.slice(0, 5)}...${prop._id.slice(-5)}`}
      />
      <CardContent>
        <Stack>
          <Typography>Reviewee: {prop.employeeName}</Typography>
          <Typography>Reviewer: {prop.reviewers.length}</Typography>
          <Typography>Due date: {prop.dateRequested}</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ width: "100%", bottom: 0, position: "relative" }}>
        <Link
          to={`/requests/${prop._id}`}
          style={{ textDecoration: "none", paddingRight: "13px" }}
        >
          <Button variant="contained">View</Button>
        </Link>

        <Button variant="contained">Quick remind</Button>
      </CardActions>
    </Card>
  );
};

export default UnconfirmedRequestCard;
