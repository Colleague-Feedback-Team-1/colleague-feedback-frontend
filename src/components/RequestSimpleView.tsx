import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { UserContextProps, Request } from "../types/types";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const RequestSimpleView = () => {
  const { user } = useContext<UserContextProps>(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [asReviewerList, setAsReviewerList] = useState<Request[] | null>();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `http://localhost:4500/api/review-requests/by-employeeid/${user!._id}`
        )
        .then((res) => {
          setRequestList(res.data);
        })
        .catch((err) => toast.error("Failed to fetch your requests"));
      axios
        .get(
          `http://localhost:4500/api/review-requests/as-reviewer/${user!._id}`
        )
        .then((res) => {
          setAsReviewerList(res.data);
        })
        .catch((err) => toast.error("Failed to fetch your requests"));

      // Create a quick loading duration
      setIsLoading(false);
    }, 700);
  }, [user]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box paddingBottom={"1rem"}>
            <Typography variant="h5">
              {t("UserDashboard.requestFeedback")}
            </Typography>
            <Stack
              direction={"row"}
              spacing={"2px"}
              flexWrap={"wrap"}
              gap={"20px"}
              paddingY={"10px"}
            >
              {requestList ? (
                requestList!.map((request) => {
                  return <RequestCard {...request} key={request._id} />;
                })
              ) : (
                <Typography>{t("UserDashboard.noRequest")}</Typography>
              )}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h5">
              {t("UserDashboard.yourFeedback")}
            </Typography>
            <Stack
              direction={"row"}
              spacing={"2px"}
              flexWrap={"wrap"}
              gap={"20px"}
              paddingY={"10px"}
            >
              {asReviewerList ? (
                asReviewerList!.map((request) => {
                  return <RequestCard {...request} key={request._id} />;
                })
              ) : (
                <Typography>{t("UserDashboard.noReview")}</Typography>
              )}
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

export default RequestSimpleView;
