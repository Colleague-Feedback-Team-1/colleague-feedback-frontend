import {
  Box,
  Typography,
  Button,
  Stack,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Request } from "../types/types";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import RequestCard from "../components/RequestCard";
import axios from "axios";
import UserContext from "../context/UserContext";
import { UserContextProps } from "../types/types";
import { Link } from "react-router-dom";
import type {} from "@mui/x-data-grid/themeAugmentation";
import RequestDataGrid from "../components/RequestDataGrid";
import RequestSimpleView from "../components/RequestSimpleView";

const UserDashboard = () => {
  const [requestList, setRequestList] = useState<Request[] | null>();
  const [asReviewerList, setAsReviewerList] = useState<Request[] | null>();
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
      return <RequestSimpleView />;
    } else {
      if (simpleView) {
        return <RequestSimpleView />;
      } else {
        return <RequestDataGrid />;
      }
    }
  };

  return (
    <Stack textAlign="left">
      <div>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingBottom={"50px"}
        >
          <Box>
            <Typography variant="h3">Hello, {user!.displayName}</Typography>
            <Typography variant="h6">Today is {date}</Typography>
          </Box>
          <Link to={"/requests/createNewRequest"}>
            <Button variant="contained" size="large" color="success">
              Create New Request
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
