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
  const { user } = useContext<UserContextProps>(UserContext);
  const { notiData, adminNoti, handleChangeNoti, forceReloadNotification } =
    useNotifications();

  const renderMenu = () => {
    return (
      <Stack p={"30px"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={"10px 0"}
        >
          <Typography variant="h2" textAlign={"left"}>
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
            backgroundColor: "#ffdbeb",
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
