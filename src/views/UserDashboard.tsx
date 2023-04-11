import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Employee } from "../types/types";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Employee|null>()

  const ExampleEmployee: Employee = {
    employeeId: "1",
    employeeName: "Dang",
    companyRole: "Developer",
  };

  useEffect(()=>{
    setTimeout(()=>{
      setCurrentUser(ExampleEmployee);
      setIsLoading(false)
    },3000)
  },[])

  return (
    <Stack paddingTop={"50px"}>
      {isLoading ? (
        <Loading/>
      ) : (
        <div>
          <Typography variant="h3">USER DASH BOARD</Typography>
          <Stack textAlign="left">
            <Typography variant="h3">Welcome, {currentUser?.employeeName}</Typography>
            <Typography variant="h4">Your feedback requests:</Typography>

            <Button
              endIcon={<AddIcon />}
              variant="contained"
              sx={{ margin: "15px 0" }}
            >
              Create New Request
            </Button>
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
