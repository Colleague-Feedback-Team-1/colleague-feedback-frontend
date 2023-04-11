import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Employee, Request } from "../types/types";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import RequestCard from "../components/RequestCard";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Employee | null>();
  const [userList, setUserList] = useState<Employee[] | null>();
  const [requestList, setRequestList] = useState<Request[] | null>();

  const ExampleRequestList: Request[] = [
    {
      employeeId: "6426a97f07be719943685504",
      employeeName: "Anton",
      assignedManagerId: undefined,
      assignedManagerName: undefined,
      employeeEmail: "anton989@gmail.com",
      isConfirmed: true,
      selfReview: true,
      reviewers: [
        {
          reviewerId: "123",
          reviewerName: "John Doe",
          reviewerEmail: "john.doe@example.com",
          companyRole: "Manager",
          feedbackSubmitted: true,
        },
        {
          reviewerId: "456",
          reviewerName: "Jane Smith",
          reviewerEmail: "jane.smith@example.com",
          companyRole: "Supervisor",
          feedbackSubmitted: true,
        },
        {
          reviewerId: "6426a97f07be719943685604",
          reviewerName: "Jane Smith",
          reviewerEmail: "jane.smith@example.com",
          companyRole: "Supervisor",
          feedbackSubmitted: true,
        },
      ],
    },
  ];

  const ExampleUserList: Employee[] = [
    {
      employeeId: "1",
      employeeName: "Essi",
      privileges: "Admin",
    },
    {
      employeeId: "2",
      employeeName: "Dang",
      privileges: "User",
    },
    {
      employeeId: "3",
      employeeName: "Ilya",
      privileges: "User",
    },
  ];

  const ExampleEmployee: Employee = {
    employeeId: "1",
    employeeName: "Dang",
    companyRole: "Developer",
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(ExampleEmployee);
      setUserList(ExampleUserList);
      setRequestList(ExampleRequestList);
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
            <Typography variant="h3">
              Welcome, {currentUser?.employeeName}
            </Typography>
            <Typography variant="h4">Your feedback requests:</Typography>
            <Stack direction={"row"} spacing={2}>
              {requestList?.map((request) => {
                return <RequestCard {...request} />;
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
