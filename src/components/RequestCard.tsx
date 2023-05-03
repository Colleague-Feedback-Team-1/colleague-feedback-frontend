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
import { useTranslation } from "react-i18next";

const RequestCard: React.FC<Request> = (prop) => {
  const { t } = useTranslation();
  const givenFeedback = prop.reviewers.filter(
    (reviewer) => reviewer.feedbackSubmitted
  ).length;
  return (
    <Card sx={{ backgroundColor: "#4CA85A", color: "white" }}>
      <CardHeader
        title={`ID ${prop._id.slice(0, 5)}...${prop._id.slice(-5)}`}
      ></CardHeader>
      <CardContent>
        <Typography fontWeight={"bold"}>
          {t("RequestCard.reviewee")}: {prop.employeeName}
        </Typography>
        {prop.confirmedByHR ? (
          <Stack>
            <Stack direction={"row"}>
              <CheckCircleIcon color="success" />
              <Typography>{t("RequestCard.confirmed")}</Typography>
            </Stack>
            <Typography>
              {t("RequestCard.feedback")}: {givenFeedback}/
              {prop.reviewers.length}
            </Typography>
          </Stack>
        ) : (
          <Stack direction={"row"}>
            <BlockIcon color="disabled" />
            <Typography>{t("RequestCard.notConfirmed")}</Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{ width: "100%", bottom: 0, position: "relative" }}>
        <Link
          to={`/requests/${prop._id}`}
          style={{ textDecoration: "none", paddingRight: "13px" }}
        >
          <Button variant="contained">{t("RequestCard.view")}</Button>
        </Link>

        <Button variant="contained">{t("RequestCard.remind")}</Button>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
