import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FeedbackForm from "../components/FeedbackForm";
import { QuestionSection, CustomFormData } from "../types/types";
import Loading from "../components/Loading";
import FormIntro from "../assets/FormIntro";
import UserContext from "../context/UserContext";
import { UserContextProps, Request, Reviewer } from "../types/types";
import { Container, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTodayDate } from "../utils/formatDate";

type RouteParams = {
  requestId: string;
};

function FeedbackSubmission() {
  const params = useParams<RouteParams>();
  const [requestData, setRequestData] = useState<Request | null>();
  const [data, setData] = useState<QuestionSection[]>([]);
  const { user } = useContext<UserContextProps>(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userRoleOnRequest, setUserRoleOnRequest] = useState<
    "reviewee" | "reviewer" | "manager" | null
  >(null);

  console.log("User role: ", userRoleOnRequest);

  // check role
  const checkRole = () => {
    console.log("running check role");
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

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/questions/")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });

    axios
      .get(
        `http://localhost:4500/api/review-requests/by-requestid/${params.requestId}`
      )
      .then((res) => {
        setRequestData(res.data);
      });
  }, []);

  useEffect(() => {
    checkRole();
  }, [requestData]);

  const submitFeedback = async (requestData: any) => {
    try {
      await axios.post(
        "http://localhost:4500/api/feedback-data/insert-feedback",
        requestData
      );
      // post notification
      let today = getTodayDate();
      const notification = {
        type: "feedback-submitted",
        date: today,
        receiver: [
          {
            receiverid: requestData.employeeid,
            receiverName: requestData.employeeName,
          },
        ],
        sender: [
          {
            senderid: user?._id,
            senderName: user?.displayName,
          },
        ],
        requestid: requestData?._id,
      };
      axios
        .post(
          "http://localhost:4500/api/notifications/insert-notification",
          notification
        )
        .then((res) => console.log(res));
      console.log("Form submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const updateReviewerFeedbackStatus = async (
    requestId: string,
    reviewerObjectId: string,
    isSelfReview: boolean
  ) => {
    if (isSelfReview === false) {
      try {
        await axios.patch(
          `http://localhost:4500/api/review-requests/update-status/${requestId}/${reviewerObjectId}`,
          { feedbackSubmitted: true }
        );
      } catch (error) {
        console.error("Error updating reviewer feedback status:", error);
      }
    } else {
      try {
        await axios.patch(
          `http://localhost:4500/api/review-requests/update-status/${requestId}`,
          {
            selfReview: true,
          }
        );
      } catch (error) {
        console.error("Error updating reviewer feedback status:", error);
      }
    }
  };

  const handleSubmit = async (formData: CustomFormData) => {
    const employeeId = requestData?.employeeid;
    const reviewerData = requestData!.reviewers.find(
      (reviewer: Reviewer) => reviewer.reviewerid === user?._id
    );

    const keys = Object.entries(formData.answers);

    const sections = keys.map(([sectionId, sectionData]) => {
      const sectionName = data.find(
        (section) => section._id === sectionId
      )?.sectionName;
      const questions = Object.entries(sectionData).map(
        ([questionId, answer]) => {
          const question = data
            .flatMap((section) => section.questions)
            .find((question) => question._id === questionId);

          return question?.isFreeForm
            ? { openFeedback: answer }
            : { score: Number(answer) };
        }
      );

      return { sectionName, submittedBy: userRoleOnRequest, questions };
    });

    const submitData = {
      requestid: params.requestId,
      employeeid: employeeId,
      sections,
    };

    if (userRoleOnRequest !== null) {
      try {
        await submitFeedback(submitData);

        if (reviewerData && reviewerData.reviewerid) {
          await updateReviewerFeedbackStatus(
            params.requestId!,
            reviewerData.reviewerid,
            false
          );
        } else {
          await updateReviewerFeedbackStatus(
            params.requestId!,
            requestData!._id,
            true
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <>
      <Container>
        <Box my={4}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <FormIntro />
              <FeedbackForm data={data} onSubmit={handleSubmit} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeedbackSubmission;
