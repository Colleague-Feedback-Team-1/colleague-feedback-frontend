import {
  Typography,
  Button,
  Stack,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { UserContextProps } from "../types/types";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationBoard from "../components/NotificationBoard";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import useNotifications from "../utils/useNotifications";

const AllNotifications = () => {
  const { user, adminNoti } = useContext<UserContextProps>(UserContext);
  const { notiData, handleChangeNoti, forceReloadNotification } =
    useNotifications();

  const renderMenu = () => {
    return (
      <Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h4" textAlign={"left"}>
            All notifications ({notiData.length})
          </Typography>
          <Box>
            {user?.description === "HR" ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={adminNoti} onChange={handleChangeNoti} />
                  }
                  label="Admin"
                />
              </FormGroup>
            ) : (
              <></>
            )}
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={forceReloadNotification}
              sx={{
                margin: "10px",
              }}
            >
              Refresh
            </Button>
          </Box>
        </Stack>

        <Stack
          sx={{
            width: "80%",
            padding: "15px",
            margin: "auto",
          }}
        >
          <NotificationBoard data={notiData} adminNoti={adminNoti} />
        </Stack>
      </Stack>
    );
  };

  return <>{renderMenu()}</>;
};
export default AllNotifications;
