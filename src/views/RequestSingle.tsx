import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  LinearProgress,
  Modal,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import ReviewerCard from "../components/ReviewerCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Employee, Request, UserContextProps } from "../types/types";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import { getTodayDate } from "../utils/formatDate";

const modalStyle = {
  position: "fixed",
  backgroundColor: "#9b51e0",
  boxShadow: 24,
  p: 4,
  color: "white",
  textAlign: "center",
  borderRadius: "30px",
  alignItem: "center",
  margin: "80px auto auto auto",
  width: "60%",
  height: "min-content",
};

const RequestSingle = () => {
  const params = useParams();
  const [requestData, setRequestData] = useState<Request | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [managerData, setManagerData] = useState<Employee | null>();
  const { user } = useContext<UserContextProps>(UserContext);
  const [userRoleOnRequest, setUserRoleOnRequest] = useState<
    "reviewee" | "reviewer" | "manager" | null
  >(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navigate = useNavigate();

  const feedbackSubmitted = requestData?.reviewers.filter(
    (reviewer: any) => reviewer.feedbackSubmitted
  );

  const formatDate = (date: string) => {
    let outputDate = new Date(date).toLocaleString();
    return outputDate;
  };

  // fetch data for the manager from requestData.assignedManagerid
  const fetchManager = () => {
    if (requestData?.assignedManagerid) {
      axios
        .get(
          `http://localhost:4500/api/employees/${
            requestData!.assignedManagerid
          }`
        )
        .then((res) => {
          setManagerData(res.data);
        });
    }
  };

  // check role
  const checkRole = () => {
    if (user?._id === requestData?.employeeid) {
      setUserRoleOnRequest("reviewee");
    } else if (user?._id === requestData?.assignedManagerid) {
      setUserRoleOnRequest("manager");
    } else {
      requestData?.reviewers.map((reviewer) => {
        if (
          user?._id === reviewer.reviewerid &&
          reviewer.feedbackSubmitted === false
        ) {
          setUserRoleOnRequest("reviewer");
        }
      });
    }
  };

  // function to reject the request (and delete it)
  const handleModalClose = () => {
    setOpenDeleteModal(false);
  };

  const openModal = () => {
    setOpenDeleteModal(true);
  };

  const rejectRequest = async () => {
    setTimeout(() => {
      axios
        .delete(
          `http://localhost:4500/api/review-requests/delete/${requestData?._id}`
        )
        .then((res) => {
          console.log(res);
          handleModalClose();
          navigate("/");
        });
        let today = getTodayDate();
      const notification = {
        type: "denied-by-admin",
        date: today,
        receiver: [
          {
            receiverid: "6441133714d75de5fb40b5fd",
            receiverName: "Dang Le",
          },
        ],
        sender: [
          {
            senderid: "Admin",
            senderName: "Admin",
          },
        ],
        requestid: null,
      };
      axios
        .post(
          "http://localhost:4500/api/notifications/insert-notification",
          notification
        )
        .then((res) => console.log(res));
    }, 1000);
  };

  // render feedback received slider
  const renderSliderAndChart = () => {
    const value =
      (feedbackSubmitted?.length! / requestData?.reviewers.length!) * 100;
    if (user?.description === "HR") {
      if (value < 80) {
        return (
          <>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{ width: "70%", height: "20px", borderRadius: "10px" }}
              color="error"
            />
            <Button variant="outlined" disabled>
              Not enough feedbacks to generate chart
            </Button>
          </>
        );
      } else {
        return (
          <>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{ width: "70%", height: "20px", borderRadius: "10px" }}
              color="success"
            />
            <Link to={`/chart/${params.requestId}`}>
              <Button variant="contained">Generate chart</Button>
            </Link>
          </>
        );
      }
    }
  };

  useEffect(() => {
    // run check role after data is fetched
    fetchManager();
    checkRole();
  }, [requestData]);

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
                <Button variant="contained" color="error" onClick={openModal}>
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
      if (
        userRoleOnRequest === "reviewee" &&
        requestData?.selfReview === false
      ) {
        return (
          <>
            <Stack direction={"row"} spacing={2}>
              <Link to={"/dashboard"}>
                <Button variant="contained">Back to dashboard</Button>
              </Link>
              <Link to={`/submission-form/${params.requestId}`}>
                <Button variant="contained" color="success">
                  Self Review
                </Button>
              </Link>
            </Stack>
          </>
        );
      } else if (
        userRoleOnRequest === "reviewer" ||
        userRoleOnRequest === "manager"
      ) {
        return (
          <Stack direction={"row"} spacing={2}>
            <Link to={"/dashboard"}>
              <Button variant="contained">Back to dashboard</Button>
            </Link>
            <Link to={`/submission-form/${params.requestId}`}>
              <Button variant="contained" color="success">
                Give feedback (as {userRoleOnRequest})
              </Button>
            </Link>
          </Stack>
        );
      } else {
        return (
          <Stack direction={"row"} spacing={2}>
            <Link to={"/dashboard"}>
              <Button variant="contained">Back to dashboard</Button>
            </Link>
          </Stack>
        );
      }
    }
  };

  return (
    <Stack sx={{ textAlign: "left", paddingBottom: "30px" }}>
      {isLoading === false ? (
        <Card
          sx={{
            padding: "20px",
            backgroundColor: "#ffdbeb",
            overflowX: "auto",
          }}
        >
          <Stack direction={"row"} spacing={10}>
            <Box paddingBottom={"50px"} component={"div"}>
              <Typography variant="h3"></Typography>

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
                <b>Due date: </b>
                {formatDate(requestData?.dateRequested!)}
              </Typography>
              <Typography variant="body1">
                <b>Status: </b>
                {requestData!.confirmedByHR ? (
                  <span style={{ color: "green" }}>Confirmed by HR</span>
                ) : (
                  <span style={{ color: "red" }}>Not confirmed</span>
                )}
              </Typography>
              <Typography variant="body1">
                <b>Self review: </b>
                {requestData!.selfReview ? (
                  <span style={{ color: "green" }}>Yes</span>
                ) : (
                  <span style={{ color: "red" }}>No</span>
                )}
              </Typography>
              <Typography>
                <b>
                  Feedbacks received:
                  {feedbackSubmitted!.length < 4 ? (
                    <span
                      style={{ color: "red" }}
                    >{` ${feedbackSubmitted?.length}/${requestData?.reviewers.length}`}</span>
                  ) : (
                    <span
                      style={{ color: "green" }}
                    >{` ${feedbackSubmitted?.length}/${requestData?.reviewers.length}`}</span>
                  )}
                </b>
              </Typography>
              {renderSliderAndChart()}
            </Box>

            <Box paddingBottom={"50px"} component={"div"}>
              <Stack direction={"row"}>
                <Box>
                  <Typography variant="h4">Reviewee:</Typography>
                  <EmployeeCard {...requestData!} />
                </Box>
                <Box component={"div"}>
                  <Typography variant="h4">Project Manager:</Typography>
                  {managerData ? (
                    <EmployeeCard
                      employeeid={managerData?._id}
                      employeeEmail={managerData!.mail}
                      employeeName={managerData!.displayName}
                      selfReview={null}
                    />
                  ) : (
                    <Typography>No manager assigned yet.</Typography>
                  )}
                </Box>
              </Stack>

              <Typography variant="h4">Reviewers:</Typography>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {requestData!.reviewers.map((reviewer) => {
                  return <ReviewerCard {...reviewer} />;
                })}
              </Stack>
            </Box>
          </Stack>

          {renderCardAction()}
          <Modal
            open={openDeleteModal}
            onClose={handleModalClose}
            keepMounted
            sx={modalStyle}
          >
            <>
              <Typography variant="h3">
                Are you sure to delete request "
                {`...${requestData?._id.slice(-7)}`}"?
              </Typography>
              <Typography variant="body1">
                This item will be deleted immediately. You can't undo this
                action.{" "}
              </Typography>
              <Stack
                direction={"row"}
                mt={3}
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={rejectRequest}
                >
                  Delete
                </Button>
              </Stack>
            </>
          </Modal>
        </Card>
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default RequestSingle;
