import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Employee, Request } from "../types/types";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import RequestCard from "../components/RequestCard";
import axios from "axios";
import UserContext from "../context/UserContext";
import { UserContextProps } from "../types/types";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Employee | null>();
  const [userList, setUserList] = useState<Employee[] | null>();
  const [requestList, setRequestList] = useState<Request[] | null>();
  const { user, setUser } = useContext<UserContextProps>(UserContext);

  console.log("Logged in User: ", user);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:4500/api/review-requests/")
        .then((res) => {
          console.log(res.data);
          setRequestList(res.data);
        })
        .catch((err) => console.log(err));
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Stack paddingTop={"50px"}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Typography variant="h3">USER DASH BOARD</Typography>
          <Stack textAlign="left">
            <Typography variant="h3">Welcome, {user.employeeName}</Typography>
            <Typography variant="h4">Your feedback requests:</Typography>
            <Stack direction={"row"} spacing={2}>
              {requestList?.map((request) => {
                return <RequestCard {...request}  key={request._id}/>;
              })}
            </Stack>

            <Typography variant="h4">
              Your co-worker needs your feedback:{" "}
            </Typography>
          </Stack>
        </div>
      )}
    </Stack>
  );
};

export default UserDashboard;
