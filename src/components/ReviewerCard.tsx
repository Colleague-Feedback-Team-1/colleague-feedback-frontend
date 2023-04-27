import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { Reviewer } from "../types/types";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ReviewerCard = (prop: Reviewer) => {
  const renderCardAction = (prop: Reviewer) => {
    if (prop.feedbackSubmitted) {
      return (
        <IconButton disabled>
          <CheckCircleIcon color="success" />
        </IconButton>
      );
    } else {
      return (
        <IconButton disabled>
          <CancelIcon color="error" />
        </IconButton>
      );
    }
  };

  return (
    <Card sx={{ width: "300px", height: "70px", margin: "10px" }}>
      <Link to={`/employees/${prop.reviewerid}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#fcb900" }}>
              {prop.reviewerName.slice(0, 1)}
            </Avatar>
          }
          title={`${prop.reviewerName}`}
          subheader={`${prop.reviewerEmail.slice(0, 15)}...`}
          action={renderCardAction({ ...prop })}
        />
      </Link>
    </Card>
  );
};

export default ReviewerCard;
