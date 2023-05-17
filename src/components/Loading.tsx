import { CircularProgress, Stack, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Stack alignItems={"center"}>
      <CircularProgress size={50} color="success" />
      <Typography p={3} variant="h5">
        Loading data...
      </Typography>
    </Stack>
  );
};

export default Loading;
