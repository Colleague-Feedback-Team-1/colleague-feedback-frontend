import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  Button,
  Card,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import ReviewerCard from "../components/ReviewerCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Request } from "../types/types";
import Loading from "../components/Loading";

const RequestSingle = () => {
  const params = useParams();
  const [requestData, setRequestData] = useState<Request|null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4500/review-requests/${params.requestId}`)
      .then((res) => {
        console.log(res.data);
        setRequestData(res.data);
        setIsLoading(false);
      });
  }, []);

  /* const handleConfirm = () => {
    axios
      .put(`http://localhost:3001/requests/${requestData.id}`, {
        ...requestData,
        isConfirmed: true,
      })
      .then((res) => {
        console.log(res.data);
        setRequestData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }; */

  return (
    <Stack sx={{ textAlign: "left" }}>
      {isLoading === false ? (
        <Card sx={{ padding: "10px", pt: "30px" }}>
          <Stack>
            <Typography variant="h3">REQUEST #{requestData?._id}</Typography>
            <Typography variant="h5">
              Status:{" "}
              {requestData!.confirmedByHR ? "Confirmed by HR" : "Not confirmed"}
            </Typography>
          </Stack>
          <Typography variant="h4">Reviewee:</Typography>
          <UserCard {...requestData!} />
          <Typography variant="h4">Reviewers:</Typography>
          <Stack direction={"row"}>
            {requestData!.reviewers.map((reviewer) => {
              return <ReviewerCard {...reviewer} />;
            })}
          </Stack>
          {requestData!.confirmedByHR ? (
            <>
              <Stack direction={"row"} spacing={1}>
                <CheckCircleIcon color="success" />
                <Typography>
                  This request has been confirmed, reviewers can start giving
                  feedback now.
                </Typography>
              </Stack>
              <Link to={"/"}>
                <Button variant="outlined">Back to dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Button variant="contained" /* onClick={handleConfirm} */>
                Confirm this request
              </Button>
              <Link to={"/"}>
                <Button variant="outlined">Back to dashboard</Button>
              </Link>
            </>
          )}
        </Card>
      ) : (
        <Loading/>
)}
    </Stack>
  );
};

export default RequestSingle;
