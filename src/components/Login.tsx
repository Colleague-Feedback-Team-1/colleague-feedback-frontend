import {
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import ExoveLogo from "../assets/ExoveLogo.png";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("Logged in User: ", user);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5600/auth", loginData, { withCredentials: true })
      .then(async (res) => {
        console.log(res.data);
        // Fetch user data from the getSession cookie function
        try {
          const userDataResponse = await axios.get("http://localhost:4500/api/employees/verify", {
            withCredentials: true,
          });
          setUser(userDataResponse.data);
          if (!user) {
            console.log("User has logged in");
            localStorage.setItem("loggedIn", "true");
          } else {
            console.log("Please log in to continue");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
      });
  };  

  return (
    <>
      {user===null ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={ExoveLogo}
            alt="Exove company logo"
            style={{
              padding: "30px",
              width: "230.769px",
              height: "50px",
              backgroundPosition: "cover",
              borderRadius: "0",
            }}
          />

          <Typography component="h1" variant="h5">
            Sign in to use the app
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
              <Grid item>
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
           <Navigate to={"/dashboard"} replace />
      )}
    </>
  );
};

export default Login;
