import {
  Box,
  Typography,
  Button,
  Stack,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { UserContextProps } from "../types/types";
import { Link } from "react-router-dom";

import type {} from "@mui/x-data-grid/themeAugmentation";
import RequestDataGrid from "../components/RequestDataGrid";
import RequestSimpleView from "../components/RequestSimpleView";

import { useTranslation } from "react-i18next";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [adminRequestList, setAdminRequestList] = useState<Request[] | null>();
  const [asReviewerList, setAsReviewerList] = useState<Request[] | null>();
  const { t } = useTranslation();

  const { user } = useContext<UserContextProps>(UserContext);
  const [simpleView, setSimpleView] = useState<boolean>(false);

  // Date display
  const date = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Change the view
  const handleChangeView = () => {
    if (simpleView === false) {
      setSimpleView(true);
    } else {
      setSimpleView(false);
    }
  };

  // render the page depends on the view choosen
  const renderDashboard = () => {
    if (user?.description !== "HR") {

      return (
        <RequestSimpleView />;
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
      if (simpleView) {
        return <RequestSimpleView />;
      } else {
        return <RequestDataGrid />;
      }
    }
  };

  return (
    <Stack textAlign="left" paddingBottom={"20px"}>
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
        {user?.description === "HR" ? (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={simpleView} onChange={handleChangeView} />
              }
              label="Simple view"
            />
          </FormGroup>
        ) : (
          <></>
        )}


        <Box>{renderDashboard()}</Box>
      </div>
    </Stack>
  );
};

export default UserDashboard;
