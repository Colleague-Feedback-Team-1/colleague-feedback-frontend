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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  const [user, setUser] = useState<Employee|null>(null);
  useEffect(() => {
    const verifyUser = async () => {
      // Check if the loggedIn flag is set in the local storage
      const loggedIn = localStorage.getItem("loggedIn");
  
      if (loggedIn) {
        try {
          const res = await axios.get("http://localhost:4500/api/employees/verify", { withCredentials: true });
          setUser(res.data);
        } catch (error) {
          console.error("Failed to verify user:", error);
        }
      }
    };
  
    verifyUser();
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
              </Route>
            </Route>
          </Routes>
        </div>
      </LocalizationProvider>
    </UserContext.Provider>
  );
};

export default App;
