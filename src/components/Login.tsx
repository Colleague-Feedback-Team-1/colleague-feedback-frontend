import { Button, Typography, TextField, Box } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import ExoveLogo from "../assets/ExoveLogo.png";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();

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
        // Fetch user data from the getSession cookie function
        try {
          const userDataResponse = await axios.get(
            "http://localhost:4500/api/employees/verify",
            {
              withCredentials: true,
            }
          );
          setUser(userDataResponse.data);
          if (!user) {
            localStorage.setItem("loggedIn", "true");
            toast.success("Login successfully");
          } else {
            toast.error("Login failed");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        toast.error(
          "Your username or password is incorrect. Please try again."
        );
      });
  };

  return (
    <>
      {user === null ? (
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
            {t("login.title")}
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
              label={t("login.username")}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("login.password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disableFocusRipple
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("login.sign")}
            </Button>
            <Typography variant="body2">{t("login.no-acc")}</Typography>
          </Box>
        </Box>
      ) : (
        <Navigate to={"/dashboard"} replace />
      )}
    </>
  );
};

export default Login;
