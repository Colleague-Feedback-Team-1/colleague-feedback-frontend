import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import ReviewerCard from "../components/ReviewerCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Employee, Request, UserContextProps } from "../types/types";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";

const RequestSingle = () => {
  const params = useParams();
  const [requestData, setRequestData] = useState<Request | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [managerData, setManagerData] = useState<Employee | null>();
  const { user } = useContext<UserContextProps>(UserContext);
  const { t } = useTranslation();
  const [userRoleOnRequest, setUserRoleOnRequest] = useState<
    "reviewee" | "reviewer" | "manager" | null
  >(null);

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
    if (user?._id == requestData?.employeeid) {
      console.log("You are the reviewee of this request! You can self review.");
      setUserRoleOnRequest("reviewee");
    } else if (user?._id == requestData?.assignedManagerid) {
      console.log(
        "You are the manager of this request! You can give review and see the result"
      );
      setUserRoleOnRequest("manager");
    } else {
      requestData?.reviewers.map((reviewer) => {
        if (
          user?._id === reviewer.reviewerid &&
          reviewer.feedbackSubmitted === false
        ) {
          console.log(
            "You are one the reviewer of this request! You can give review."
          );
          setUserRoleOnRequest("reviewer");
        }
      });
    }
  };

  // render feedback received slider
  const renderSlider = () => {
    const value =
      (feedbackSubmitted?.length! / requestData?.reviewers.length!) * 100;
    console.log("Slider value: ", value);
    if (value < 80) {
      return (
        <>
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{ width: "70%", height: "20px", borderRadius: "10px" }}
            color="error"
          />
            <Button variant="outlined" disabled>{t("RequestSingle.gfChart")}</Button>
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
            <Button variant="contained">{t("RequestSingle.gChart")}</Button>
          </Link>
        </>
      );
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
            {t("RequestSingle.assignManager")}
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack spacing={2} direction={"row"}>
                <Button variant="contained" color="error">
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
                <Button variant="contained">{t("RequestSingle.toDashboard")}</Button>
              </Link>
              <Link to={`/submission-form/${params.requestId}`}>
                <Button variant="contained" color="success">
                {t("RequestSingle.review")} 
                </Button>
              </Link>
            </Stack>
          </>
        );
      } else if (userRoleOnRequest !== null) {
        return (
          <Stack direction={"row"} spacing={2}>
            <Link to={"/dashboard"}>
              <Button variant="contained">{t("RequestSingle.toDashboard")}</Button>
            </Link>
            <Link to={`/submission-form/${params.requestId}`}>
              <Button variant="contained" color="success">
              {t("RequestSingle.giveFeedback")} ({t("RequestSingle.as")} {userRoleOnRequest})
              </Button>
            </Link>
          </Stack>
        );
      } else {
        return (
          <Stack direction={"row"} spacing={2}>
            <Link to={"/dashboard"}>
              <Button variant="contained">{t("RequestSingle.toDashboard")}</Button>
            </Link>
          </Stack>
        );
      }
    }
  };

  return (
    <Stack sx={{ textAlign: "left", paddingBottom: "30px" }}>
      {isLoading === false ? (
        <Card sx={{ padding: "20px", backgroundColor: "#ffdbeb" }}>
          <Stack direction={"row"} spacing={10}>
            <Box paddingBottom={"50px"} component={"div"}>
              <Typography variant="h3">
              {t("RequestSingle.requestID")} {`...${requestData?._id.slice(-7)}`}
              </Typography>

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
                <b>{t("RequestSingle.created")}</b>
                {formatDate(requestData?.createdAt!)}
              </Typography>
              <Typography variant="body1">
                <b>{t("RequestSingle.date")}</b>
                {formatDate(requestData?.dateRequested!)}
              </Typography>
              <Typography variant="body1">
                <b>{t("RequestSingle.status")} </b>
                {requestData!.confirmedByHR ? (
                  <span style={{ color: "green" }}>{t("RequestSingle.confirmed")}</span>
                ) : (
                  <span style={{ color: "red" }}>{t("RequestSingle.notConfirmed")}</span>
                )}
              </Typography>
              <Typography variant="body1">
                <b>{t("RequestSingle.selfReview")} </b>
                {requestData!.selfReview ? (
                  <span style={{ color: "green" }}>{t("RequestSingle.yes")}</span>
                ) : (
                  <span style={{ color: "red" }}>{t("RequestSingle.no")}</span>
                )}
              </Typography>
              <Typography>
                <b>
                  {" "}
                  {t("RequestSingle.feedbacks")}{" "}
                  {`${feedbackSubmitted?.length}/${requestData?.reviewers.length}`}
                </b>
              </Typography>
              {renderSlider()}
            </Box>

            <Box paddingBottom={"50px"} component={"div"}>
              <Stack direction={"row"}>
                <Box>
                  <Typography variant="h4">{t("RequestSingle.reviewee")}</Typography>
                  <EmployeeCard {...requestData!} />
                </Box>
                <Box component={"div"}>
                  <Typography variant="h4">{t("RequestSingle.manager")}</Typography>
                  {managerData ? (
                    <EmployeeCard
                      employeeid={managerData?._id}
                      employeeEmail={managerData!.mail}
                      employeeName={managerData!.displayName}
                      selfReview={null}
                    />
                  ) : (
                    <Typography>{t("RequestSingle.noManager")}</Typography>
                  )}
                </Box>
              </Stack>

              <Typography variant="h4">{t("RequestSingle.reviewers")}</Typography>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {requestData!.reviewers.map((reviewer) => {
                  return <ReviewerCard {...reviewer} />;
                })}
              </Stack>
            </Box>
          </Stack>

          {renderCardAction()}
        </Card>
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default RequestSingle;
