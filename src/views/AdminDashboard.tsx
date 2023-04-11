import {  Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
const AdminDashboard = () => {
  return (
    <Stack paddingTop={"50px"}>
      <Typography variant="h3">ADMIN DASH BOARD</Typography>
      <Stack textAlign="left">

        <Typography variant="h4">Your feedback requests:</Typography>

        <Button
          endIcon={<AddIcon />}
          variant="contained"
          sx={{ margin: "15px 0" }}
        >
          Create New Request
        </Button>
        <Typography variant="h4">
          Your co-worker needs your feedback:{" "}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AdminDashboard;
