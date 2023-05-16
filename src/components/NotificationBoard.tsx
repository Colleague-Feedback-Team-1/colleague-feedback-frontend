import {
  MenuItem,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Notification } from "../types/types";
import ExoveLogo from "../assets/ExoveLogoSquareBlack.jpeg";
import { getTodayDate } from "../utils/formatDate";
import CreateNewRequestCard from "./NotificationCards/CreateNewRequestCard";
import DeniedByAdminCard from "./NotificationCards/DeniedByAdminCard";
import ConfirmedByAdminCard from "./NotificationCards/ConfirmedByAdminCard";
import FeedbackSubmittedCard from "./NotificationCards/FeedbackSubmittedCard";
import RemindCreateRequestCard from "./NotificationCards/RemindCreateRequestCard";
import RemindSelfReviewCard from "./NotificationCards/RemindSelfReviewCard";
import RemindGiveFeedbackCard from "./NotificationCards/RemindGiveFeedbackCard";
import AskForFeedbackCard from "./NotificationCards/AskForFeedbackCard";

interface NotificationBoardProps {
  data: Notification[];
  adminNoti: boolean;
}

const NotificationBoard = ({ data, adminNoti }: NotificationBoardProps) => {
  let today = getTodayDate();

  console.log(data);
  const renderNotifications = () => {
    return data.map((noti: Notification) => {
      switch (noti.type) {
        case "create-new-request":
          return (
            <MenuItem key={noti._id}>
              <CreateNewRequestCard noti={noti} />
            </MenuItem>
          );
        case "denied-by-admin":
          return (
            <MenuItem key={noti._id}>
              <DeniedByAdminCard noti={noti} />
            </MenuItem>
          );
        case "confirmed-by-admin":
          return (
            <MenuItem key={noti._id}>
              <ConfirmedByAdminCard noti={noti} />
            </MenuItem>
          );
        case "feedback-submitted":
          return (
            <MenuItem key={noti._id}>
              <FeedbackSubmittedCard noti={noti} />
            </MenuItem>
          );
        case "remind-create-request":
          return (
            <MenuItem key={noti._id}>
              <RemindCreateRequestCard noti={noti} />
            </MenuItem>
          );
        case "remind-self-review":
          return (
            <MenuItem key={noti._id}>
              <RemindSelfReviewCard noti={noti} />
            </MenuItem>
          );
        case "remind-give-feedback":
          return (
            <MenuItem key={noti._id}>
              <RemindGiveFeedbackCard noti={noti} />
            </MenuItem>
          );
        case "ask-for-feedback":
          return (
            <MenuItem key={noti._id}>
              <AskForFeedbackCard noti={noti} />
            </MenuItem>
          );
      }
    });
  };

  return <div>{renderNotifications()}</div>;
};

export default NotificationBoard;
