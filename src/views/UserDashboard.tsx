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
  const { user } = useContext<UserContextProps>(UserContext);
  const [simpleView, setSimpleView] = useState<boolean>(false);
  const { t } = useTranslation();

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
    <Stack textAlign="left" paddingBottom={"20px"}>
      <div>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h4">{t("UserDashboard.title")}</Typography>
          <Link to={"/requests/createNewRequest"}>
            <Button variant="contained" size="large" color="success">
              {t("UserDashboard.newRequest")}
            </Button>
          </Link>
        </Stack>
        {user?.description === "HR" ? (
          <FormGroup sx={{ padding: "1rem 0", maxWidth: "150px" }}>
            <FormControlLabel
              control={
                <Switch checked={simpleView} onChange={handleChangeView} />
              }
              label={t("UserDashboard.simpleView")}
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
