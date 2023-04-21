import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {  Request } from "../types/types";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import RequestCard from "../components/RequestCard";
import axios from "axios";
import UserContext from "../context/UserContext";
import { UserContextProps } from "../types/types";
import UnconfirmedRequestCard from "../components/UnconfirmedRequestCard";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [unconfirmedRequest, setUnconfirmedRequest] = useState<
    Request[] | null
  >();
  const { user } = useContext<UserContextProps>(UserContext);

  // Date display
  const date = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchingAdminData = async () => {
      axios
        .get(`http://localhost:4500/api/review-requests/to-confirm`)
        .then((res) => {
          console.log(res.data)
          setUnconfirmedRequest(res.data);
        });
    };
    setTimeout(() => {
      axios
        .get(
          `http://localhost:4500/api/review-requests/by-employeeid/${user!._id}`
        )
        .then((res) => {
          setRequestList(res.data);
        })
        .catch((err) => console.log(err));
      setIsLoading(false);

      if (user?.description === "HR") {
        fetchingAdminData();
      }
    }, 1500);
  }, [user]);

  /* Fetch data if admin is logged in */

  return (
    <Stack textAlign="left">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Box paddingBottom={"50px"}>
            <Typography variant="h3">Hello, {user!.displayName}</Typography>
            <Typography variant="h6">Today is {date}</Typography>
          </Box>

          {user?.description === "HR" ? (
            <Box paddingBottom={"50px"}>
              <Typography variant="h4">
                [Admin] Unconfirmed requests:
              </Typography>
              <Stack direction={"row"} spacing={2}>
                {unconfirmedRequest ? (
                  unconfirmedRequest!.map((request) => {
                    return (
                      <UnconfirmedRequestCard {...request} key={request._id} />
                    );
                  })
                ) : (
                  <p>You have no requests</p>
                )}
              </Stack>
            </Box>
          ) : (
            <></>
          )}

          <Box paddingBottom={"50px"}>
            <Typography variant="h4">Your feedback requests:</Typography>
            <Stack direction={"row"} spacing={2}>
              {requestList ? (
                requestList!.map((request) => {
                  return <RequestCard {...request} key={request._id} />;
                })
              ) : (
                <p>You have no requests</p>
              )}
            </Stack>
          </Box>
          <Typography variant="h4">
            Your co-worker needs your feedback:{" "}
          </Typography>
        </div>
      )}
    </Stack>
  );
};

export default UserDashboard;
