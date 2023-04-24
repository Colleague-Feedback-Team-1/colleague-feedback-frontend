import { Box, Typography, Stack, Button, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import ReviewerCard from "../components/ReviewerCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Employee, Request, UserContextProps } from "../types/types";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";

const RequestSingle = () => {
  const params = useParams();
  const [requestData, setRequestData] = useState<Request | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [managerData, setManagerData] = useState<Employee | null>();
  const { user } = useContext<UserContextProps>(UserContext);

  const formatDate = (date: string) => {
    let outputDate = new Date(date).toLocaleString();
    return outputDate;
  };
  console.log(requestData);

  // fetch data for the manager from requestData.assignedManagerid
  const fetchManager = () => {
    if (requestData?.assignedManagerid) {
      console.log("This request has managerId", requestData.assignedManagerid);
      axios
        .get(
          `http://localhost:4500/api/employees/${
            requestData!.assignedManagerid
          }`
        )
        .then((res) => {
          console.log(res.data);
          setManagerData(res.data);
        });
    }
  };
  
useEffect(()=> {
  console.log('requestData changed, check for managerId');
  if (requestData?.assignedManagerid) {
    console.log(requestData.assignedManagerid);
    fetchManager()
  } else {
    console.log('no managerid yet')
  }

},[requestData])
  /* Fetch data of the request */
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `http://localhost:4500/api/review-requests/by-requestid/${params.requestId}`
        )
        .then((res) => {
          setRequestData(res.data);
          if (requestData?.assignedManagerid) {
            fetchManager();
          }
          setIsLoading(false);
        });
    }, 2000);
  }, [params.requestId]);

  // check the confirm status and user priviledge to render the action buttons
  const renderCardAction = () => {
    if (requestData?.confirmedByHR === false) {
      if (user?.description === "HR") {
        return (
          <>
            <Typography variant="body1">
              HR can click the "Confirm this request" to assign an manager and
              then confirm this request.
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack spacing={2} direction={"row"}>
                <Button variant="contained" color="error">
                  Reject this request
                </Button>
                <Link to={`/requests/${params.requestId}/confirm`}>
                  <Button
                    variant="contained"
                    color="success" /* onClick={handleConfirm} */
                  >
                    Confirm this request
                  </Button>
                </Link>
              </Stack>

              <Link to={"/dashboard"}>
                <Button variant="contained" color="info">
                  Back to dashboard
                </Button>
              </Link>
            </Stack>
          </>
        );
      }
    } else {
      return (
        <Link to={"/dashboard"}>
          <Button variant="outlined">Back to dashboard</Button>
        </Link>
      );
    }
  };

  return (
    <Stack sx={{ textAlign: "left" }}>
      {isLoading === false ? (
        <Card sx={{ padding: "20px", backgroundColor: "#00d084" }}>
          <Box paddingBottom={"50px"} component={"div"}>
            <Typography variant="h3">
              REQUEST #
              {`${requestData?._id.slice(0, 5)}...${requestData?._id.slice(
                -3
              )}`}
            </Typography>

            {requestData?.confirmedByHR ? (
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center", pb: 4 }}
              >
                <CheckCircleIcon color="success" />
                <Typography variant="body2">
                  This request has been confirmed, reviewers can start giving
                  feedback now.
                </Typography>
              </Stack>
            ) : (
              <></>
            )}

            <Typography variant="body1">
              <b>Created At: </b>
              {formatDate(requestData?.createdAt!)}
            </Typography>
            <Typography variant="body1">
              <b>Status: </b>
              {requestData!.confirmedByHR ? (
                <span style={{ color: "green" }}>Confirmed by HR</span>
              ) : (
                <span style={{ color: "red" }}>Not confirmed</span>
              )}
            </Typography>
          </Box>
          <Box paddingBottom={"50px"} component={"div"}>
            <Typography variant="h4">Project Manager:</Typography>
            {managerData ? (
              <EmployeeCard
                employeeid={managerData?._id}
                employeeEmail={managerData!.mail}
                employeeName={managerData!.displayName}
              />
            ) : (
              <Typography>No manager assigned yet.</Typography>
            )}
          </Box>

          <Box paddingBottom={"50px"} component={"div"}>
            <Typography variant="h4">Reviewee:</Typography>
            <EmployeeCard {...requestData!} />
            <Typography variant="h4">Reviewers:</Typography>
            <Stack direction={"row"} flexWrap={'wrap'}>
              {requestData!.reviewers.map((reviewer) => {
                return <ReviewerCard {...reviewer} />;
              })}
            </Stack>
          </Box>
          {renderCardAction()}
        </Card>
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default RequestSingle;
