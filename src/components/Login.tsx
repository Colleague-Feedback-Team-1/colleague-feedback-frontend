import {
  Button,
  Stack,
  Typography,
  TextField,
  Box,
  Avatar,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log("Logged in User: ", user);

  const handleLogOut = () => {
    axios.post("http://localhost:4500/api/employees/logout").then((res)=> {
      console.log(res.data);
      console.log("Log out successfully.")
      setUser({
        _id: "",
        employeeName: "",
        privileges: "User",
      });
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginData = {
      employeeEmail: data.get("employeeEmail"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:4500/api/employees/login", loginData)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        if (user._id !== "") {
          console.log("User has logged in");
          return navigate("/dashboard");
        } else {
          console.log("Please log in to continue");
        }
      });
  };

  return (
    <>
    { user.employeeName == "" 
    ? (      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to use the app
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="employeeEmail"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
) 
    : <button onClick={handleLogOut}>Log out</button>
    }
    </>
  );
};

export default Login;
