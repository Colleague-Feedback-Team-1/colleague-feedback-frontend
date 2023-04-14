import { Avatar, Card, CardHeader } from "@mui/material";
import { Reviewer } from "../types/types";

const ReviewerCard = (prop:Reviewer) => {
    return (
      <Card sx={{ width: "150px", height:'70px', margin:"10px" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "green" }}>{prop.reviewerName.slice(0,1)}</Avatar>}
          title={prop.reviewerName}
          subheader={`ID #${prop.reviewerEmail}`}
        />
      </Card>
    );
};

export default ReviewerCard;