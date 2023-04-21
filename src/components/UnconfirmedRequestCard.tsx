import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader
} from "@mui/material";
import { Stack } from "@mui/system";
import { Request } from "../types/types";
import { Link } from "react-router-dom";
import React from "react";

const UnconfirmedRequestCard: React.FC<Request> = (prop) => {
  return (
    <Card sx={{ backgroundColor: "#ff6900", color: "white" }}>
      <CardHeader
        title={`ID ${prop?._id.slice(0, 5)}...${prop?._id.slice(-3)}`}
      ></CardHeader>
      <CardContent>
        <Stack>
          <Typography>Reviewee: {prop.employeeName}</Typography>
          <Typography>Reviewer: {prop.reviewers.length}</Typography>
          <Typography>Due date: {prop.dueDate}</Typography>
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
