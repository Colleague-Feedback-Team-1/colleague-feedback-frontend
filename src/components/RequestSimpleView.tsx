import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { UserContextProps, Request } from "../types/types";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import Loading from "../components/Loading";

const RequestSimpleView = () => {
  const { user } = useContext<UserContextProps>(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [asReviewerList, setAsReviewerList] = useState<Request[] | null>();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `http://localhost:4500/api/review-requests/by-employeeid/${user!._id}`
        )
        .then((res) => {
          setRequestList(res.data);
        })
        .catch((err) => console.log(err));
      axios
        .get(
          `http://localhost:4500/api/review-requests/as-reviewer/${user!._id}`
        )
        .then((res) => {
          setAsReviewerList(res.data);
        })
        .catch((err) => console.log(err));

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
          <Box paddingBottom={"50px"}>
            <Typography variant="h4">Your feedback requests:</Typography>
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
                <Typography>You have no requests</Typography>
              )}
            </Stack>
          </Box>

          <Box paddingBottom={"50px"}>
            <Typography variant="h4">
              Your co-worker needs your feedback:{" "}
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
                <Typography>
                  You have no review requests from your colleagues
                </Typography>
              )}
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

export default RequestSimpleView;
