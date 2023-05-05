import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { Request } from "../types/types";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import RequestCard from "../components/RequestCard";
import axios from "axios";
import UserContext from "../context/UserContext";
import { UserContextProps, Reviewer } from "../types/types";
import { Link } from "react-router-dom";
//import type {} from "@mui/x-data-grid/themeAugmentation";
import RequestDashboard from "../components/RequestDataGrid";
import { useTranslation } from "react-i18next";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [adminRequestList, setAdminRequestList] = useState<Request[] | null>();
  const [asReviewerList, setAsReviewerList] = useState<Request[] | null>();
  const { t } = useTranslation();
 
  const { user } = useContext<UserContextProps>(UserContext);

  // Date display
  const date = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      // Admin can fetch all requests in db
      axios.get(`http://localhost:4500/api/review-requests/`).then((res) => {
        setAdminRequestList(res.data);
      });
    };

    const fetchUserData = async () => {
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
    };

    // Create a quick loading duration
    setTimeout(() => {
      if (user?.description === "HR") {
        fetchAdminData();
      } else {
        fetchUserData();
      }
      setIsLoading(false);
    }, 1000);
  }, [user]);

  // render the page depends on the view choosen
  const renderDashboard = () => {
    if (user?.description !== "HR") {
      return (
        <>
          <Box paddingBottom={"50px"}>
            <Typography variant="h4">{t("UserDashboard.requestFeedback")}</Typography>
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
                <Typography>{t("UserDashboard.noRequest")}</Typography>
              )}
            </Stack>
            
          </Box>

          <Box paddingBottom={"50px"}>
            <Typography variant="h4">
            {t("UserDashboard.yourFeedback")}{" "}
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
                 {t("UserDashboard.yourColleagues")}
                </Typography>
              )}
            </Stack>
            
          </Box>
        </>
      );
    } else {
      return <RequestDashboard />;
    }
  };

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
              <Typography variant="h3">{t("UserDashboard.hello")} {user!.displayName}</Typography>
              <Typography variant="h6">{t("UserDashboard.today")}{date}</Typography>
            </Box>
            <Link to={"/requests/createNewRequest"}>
              <Button variant="contained" size="large" color="success">
              {t("UserDashboard.newRequest")}
              </Button>
            </Link>
          </Stack>

          <Box>{renderDashboard()}</Box>
        </div>
      )}
    </Stack>
  );
};

export default UserDashboard;
