import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "./views/UserDashboard";
import Login from "./components/Login";
import Layout from "./views/Layout";
import RequestSingle from "./views/RequestSingle";
import { useEffect, useState } from "react";
import { Employee } from "./types/types";
import UserContext from "./context/UserContext";
import EmployeeSingle from "./views/EmployeeSingle";
import ProtectedRoute from "./auth/ProtectedRoute";
import ConfirmRequest from "./views/ConfirmRequest";
import axios from "axios";
import CreateNewRequest from "./views/CreateNewRequest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FeedbackSubmission from "./views/FeedbackSubmission";
import RequestDashboard from "./components/RequestDataGrid";
import RadarChartDisplay from "./views/RadarChartDisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotiDemo from "./components/NotiDemo";

const App = () => {
  const [user, setUser] = useState<Employee | null>(null);
  useEffect(() => {
    // Check if the loggedIn flag is set in the local storage
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn) {
      axios
        .get("http://localhost:4500/api/employees/verify", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to verify user:", err);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<UserDashboard />}></Route>
                <Route
                  path="/employees/:employeeId"
                  element={<EmployeeSingle />}
                ></Route>
                <Route
                  path="/requests/:requestId"
                  element={<RequestSingle />}
                ></Route>
                <Route
                  path="/requests/:requestId/confirm"
                  element={<ConfirmRequest />}
                ></Route>
                <Route
                  path="/requests/createNewRequest"
                  element={<CreateNewRequest />}
                ></Route>

                <Route
                  path="/submission-form/:requestId"
                  element={<FeedbackSubmission />}
                ></Route>

                <Route
                  path="/notification"
                  element={<NotiDemo />}
                ></Route>

                <Route
                  path="/chart/:requestId"
                  element={<RadarChartDisplay />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </div>
        {/* Toast container, autoclose after 2secs */}
        <ToastContainer autoClose={2000} />
      </LocalizationProvider>
    </UserContext.Provider>
  );
};

export default App;
