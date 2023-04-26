import { Box, Typography, Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { Request } from "../types/types";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import RequestCard from "../components/RequestCard";
import axios from "axios";
import UserContext from "../context/UserContext";
import { UserContextProps } from "../types/types";
import UnconfirmedRequestCard from "../components/UnconfirmedRequestCard";
import { Link } from "react-router-dom";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [asReviewerList, setAsReviewerList] = useState<Request[] | null>();
  const [unconfirmedRequest, setUnconfirmedRequest] = useState<
    Request[] | null
  >();
  const { user } = useContext<UserContextProps>(UserContext);
  const [view, setView] = useState<"row" | "grid">("row");

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
          console.log(res.data);
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
      axios
        .get(
          `http://localhost:4500/api/review-requests/as-reviewer/${user!._id}`
        )
        .then((res) => {
          setAsReviewerList(res.data);
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
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingBottom={"50px"}
          >
            <Box>
              <Typography variant="h3">Hello, {user!.displayName}</Typography>
              <Typography variant="h6">Today is {date}</Typography>
            </Box>
            <Link to={"/requests/createNewRequest"}>
              <Button variant="contained" size="large" color="success">
                Create New Request
              </Button>
            </Link>
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            justifyContent={"flex-end"}
            marginBottom={"30px"}
          >
            <Typography>View</Typography>
            {view === "row" ? (
              <>
                <IconButton
                  sx={{
                    border: "0.5px solid black",
                    borderRadius: 2,
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  <SplitscreenOutlinedIcon />
                </IconButton>
                <IconButton
                  sx={{ border: "0.5px solid black", borderRadius: 2 }}
                  onClick={() => setView("grid")}
                >
                  <ViewListOutlinedIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  sx={{ border: "0.5px solid black", borderRadius: 2 }}
                  onClick={() => setView("row")}
                >
                  <SplitscreenOutlinedIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  sx={{
                    border: "0.5px solid black",
                    borderRadius: 2,
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  <ViewListOutlinedIcon />
                </IconButton>
              </>
            )}
          </Stack>

          {user?.description === "HR" ? (
            <Box paddingBottom={"50px"}>
              <Typography variant="h4">
                [Admin] Unconfirmed requests:
              </Typography>
              <Stack
                direction={"row"}
                spacing={"2px"}
                flexWrap={"wrap"}
                gap={"20px"}
                paddingY={"10px"}
              >
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
              <Button variant="outlined" color="info">
                See all
              </Button>
            </Box>
          ) : (
            <></>
          )}

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
                <p>You have no requests</p>
              )}
            </Stack>
            <Button variant="outlined" color="info">
              See all
            </Button>
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
            <Button variant="outlined" color="info">
              See all
            </Button>
          </Box>
        </div>
      )}
    </Stack>
  );
};

export default UserDashboard;
