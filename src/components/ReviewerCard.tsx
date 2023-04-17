import { Avatar, Card, CardHeader } from "@mui/material";
import { Reviewer } from "../types/types";
import { Link } from "react-router-dom";

const ReviewerCard = (prop: Reviewer) => {
  return (
    <Card sx={{ width: "250px", height: "70px", margin: "10px" }}>
      <Link to={`/employees/${prop.reviewerid}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "green" }}>
              {prop.reviewerName.slice(0, 1)}
            </Avatar>
          }
          title={`${prop.reviewerName} (${prop.role}) `}
          subheader={`${prop.reviewerEmail} `}
        />
      </Link>
    </Card>
  );
};

export default ReviewerCard;
