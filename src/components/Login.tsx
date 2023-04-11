import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Typography variant="h3">Login to use the app</Typography>
      <Stack direction={"row"} p={2} spacing={3} justifyContent={"center"}>
        <Button variant="contained">
          <Link to={"/admin"}>Admin</Link>
        </Button>
        <Button variant="contained">
          <Link to={"/user"}>User</Link>
        </Button>
      </Stack>
    </>
  );
};

export default Login;
