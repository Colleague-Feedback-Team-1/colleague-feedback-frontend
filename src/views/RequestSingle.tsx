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
import { formatDate, getTodayDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const modalStyle = {
  position: "fixed",
  backgroundColor: "white",
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const feedbackSubmitted = requestData?.reviewers.filter(
    (reviewer: any) => reviewer.feedbackSubmitted
  );

  // fix bug, so that everytime params.requestId change, all the state reload.
  const refreshData = () => {
    setUserRoleOnRequest(null);
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
          handleModalClose();
          navigate("/");
        });
      let today = getTodayDate();
      const notification = {
        type: "denied-by-admin",
        date: today,
        receiver: [
          {
            receiverid: requestData?.employeeid,
            receiverName: requestData?.employeeName,
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
        .then((res) => toast.success("Request rejected"));
    }, 500);
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
              sx={{
                width: "100%",
                height: "20px",
                borderRadius: "10px",
                margin: "10px 0 15px 0",
              }}
              color="error"
            />
            <Button variant="outlined" disabled>
              {t("RequestSingle.generateChart")}
            </Button>
          </>
        );
      } else {
        return (
          <>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                width: "100%",
                height: "20px",
                borderRadius: "10px",
                margin: "10px 0 15px 0",
              }}
              color="success"
            />
            <Link to={`/chart/${params.requestId}`}>
              <Button variant="contained">
                {t("RequestSingle.generateChart")}
              </Button>
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
    refreshData();
    setIsLoading(true);
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
    }, 1000);
  }, [params.requestId]);

  // check the confirm status and user priviledge to render the action buttons
  const renderCardAction = () => {
    if (requestData?.confirmedByHR === false) {
      if (user?.description === "HR") {
        return (
          <>
            <Typography variant="body1">
              {t("RequestSingle.assignManager")}
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack spacing={2} direction={"row"}>
                <Button variant="contained" color="error" onClick={openModal}>
                  {t("RequestSingle.rejectRequest")}
                </Button>
                <Link to={`/requests/${params.requestId}/confirm`}>
                  <Button
                    variant="contained"
                    color="success" /* onClick={handleConfirm} */
                  >
                    {t("RequestSingle.confirmRequest")}
                  </Button>
                </Link>
              </Stack>

              <Link to={"/dashboard"}>
                <Button variant="contained" color="info">
                  {t("RequestSingle.toDashboard")}
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
                <Button variant="contained">
                  {t("RequestSingle.toDashboard")}
                </Button>
              </Link>
              <Link to={`/submission-form/${params.requestId}`}>
                <Button variant="contained" color="success">
                  {t("RequestSingle.selfReview")}
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
              <Button variant="contained">
                {t("RequestSingle.toDashboard")}
              </Button>
            </Link>
            <Link to={`/submission-form/${params.requestId}`}>
              <Button variant="contained" color="success">
                {t("RequestSingle.giveFeedback", {
                  userRole: userRoleOnRequest,
                })}
              </Button>
            </Link>
          </Stack>
        );
      } else {
        return (
          <Stack direction={"row"} spacing={2}>
            <Link to={"/dashboard"}>
              <Button variant="contained">
                {t("RequestSingle.toDashboard")}
              </Button>
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
            backgroundColor: "hsl(0deg 5.71% 86.27% / 14.9%)",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          <Stack direction={"row"} spacing={20}>
            <Box paddingBottom={"50px"} component={"div"} minWidth={"250px"}>
              {requestData?.confirmedByHR ? (
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ alignItems: "center", pb: 4 }}
                >
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2">
                    {t("RequestSingle.requestConfirmed")}
                  </Typography>
                </Stack>
              ) : (
                <></>
              )}

              <Typography variant="body1">
                <label style={{ fontSize: "0.8rem" }}>
                  {t("RequestSingle.created")}
                </label>
                <b> {formatDate(requestData?.createdAt!)}</b>
              </Typography>
              <Typography variant="body1">
                <label style={{ fontSize: "0.8rem" }}>
                  {t("RequestSingle.date")}
                </label>
                <b> {formatDate(requestData?.dateRequested!)}</b>
              </Typography>
              <Typography variant="body1">
                <label style={{ fontSize: "0.8rem" }}>
                  {t("RequestSingle.status")}{" "}
                </label>
                {requestData!.confirmedByHR ? (
                  <b style={{ color: "green" }}>
                    {t("RequestSingle.confirmed")}
                  </b>
                ) : (
                  <b style={{ color: "red" }}>
                    {t("RequestSingle.notConfirmed")}
                  </b>
                )}
              </Typography>
              <Typography variant="body1">
                <label style={{ fontSize: "0.8rem" }}>
                  {t("RequestSingle.review")}
                </label>
                {requestData!.selfReview ? (
                  <b style={{ color: "green" }}>{t("RequestSingle.yes")}</b>
                ) : (
                  <b style={{ color: "red" }}>{t("RequestSingle.no")}</b>
                )}
              </Typography>
              <Typography>
                <label style={{ fontSize: "0.8rem" }}>
                  {t("RequestSingle.feedbacks")}
                </label>
                {feedbackSubmitted!.length < 4 ? (
                  <b
                    style={{ color: "red" }}
                  >{` ${feedbackSubmitted?.length}/${requestData?.reviewers.length}`}</b>
                ) : (
                  <b
                    style={{ color: "green" }}
                  >{` ${feedbackSubmitted?.length}/${requestData?.reviewers.length}`}</b>
                )}
              </Typography>
              {renderSliderAndChart()}
            </Box>

            <Box paddingBottom={"50px"} component={"div"}>
              <Stack direction={"row"} paddingBottom={"2rem"}>
                <Box>
                  <Typography variant="h4">
                    {t("RequestSingle.reviewee")}
                  </Typography>
                  <EmployeeCard {...requestData!} />
                </Box>
                <Box component={"div"}>
                  <Typography variant="h4">
                    {t("RequestSingle.manager")}
                  </Typography>
                  {managerData ? (
                    <EmployeeCard
                      employeeid={managerData?._id}
                      employeeEmail={managerData!.mail}
                      employeeName={managerData!.displayName}
                      selfReview={null}
                    />
                  ) : (
                    <Typography padding={"1rem 0 0 1rem"}>
                      {t("RequestSingle.noManager")}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Typography variant="h4">
                {t("RequestSingle.reviewers")}
              </Typography>
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
              <Typography variant="h5">
                {t("RequestSingle.deleteRequest")}
              </Typography>
              <Typography variant="body1">
                {t("RequestSingle.deleteImmediately")}
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
                  {t("RequestSingle.cancel")}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={rejectRequest}
                >
                  {t("RequestSingle.delete")}
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
