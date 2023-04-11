import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { Stack } from "@mui/system";
import { Request } from "../types/types";
import React from "react";


const RequestCard:React.FC<Request> = (prop) => {
  const givenFeedback = prop.reviewers.filter(
    (reviewer) => reviewer.feedbackSubmitted
  ).length;
  return (
    <Card sx={{ backgroundColor: "#4CA85A", color: "white" }}>
      <CardContent>
        {prop.isConfirmed ? (
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

      {prop.isConfirmed ? (
        <CardActions>
          {/* <Link to={`/request/${prop.id}`} style={{ textDecoration: "none" }}>
            <Button variant="contained">View</Button>
          </Link> */}
          <Button variant="contained" >
            View
          </Button>
          <Button variant="contained">Quick remind</Button>
        </CardActions>
      ) : (
        <CardActions>
          <Button variant="outlined" disabled>
            View
          </Button>
          <Button variant="contained">Quick remind</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default RequestCard;
