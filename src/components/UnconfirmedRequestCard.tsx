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
import { useTranslation } from "react-i18next";

const UnconfirmedRequestCard: React.FC<Request> = (prop) => {
  const { t } = useTranslation();
  // convert the time from the time converter to the format that MongoDB accept
  const formatDate = (date: string) => {
    let outputDate = new Date(date).toLocaleDateString();
    return outputDate;
  };

  return (
    <Card sx={{ backgroundColor: "#ff6900", color: "white" }}>
      <CardHeader
        title={`ID ${prop._id.slice(0, 5)}...${prop._id.slice(-5)}`}
      />
      <CardContent>
        <Stack>
          <Typography>
            {" "}
            {t("UnconfirmedRequestCard.reviewee")}: {prop.employeeName}
          </Typography>
          <Typography>
            {t("UnconfirmedRequestCard.reviewer")}: {prop.reviewers.length}
          </Typography>
          <Typography>
            {t("UnconfirmedRequestCardDueDate.title")}:{" "}
            {formatDate(prop.dateRequested!)}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ width: "100%", bottom: 0, position: "relative" }}>
        <Link
          to={`/requests/${prop._id}`}
          style={{ textDecoration: "none", paddingRight: "13px" }}
        >
          <Button variant="contained">
            {t("UnconfirmedRequestCardView.title")}
          </Button>
        </Link>

        <Button variant="contained">
          {t("UnconfirmedRequestQuickRemind.title")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UnconfirmedRequestCard;
