import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "./views/UserDashboard";
import AdminDashboard from "./views/AdminDashboard";
import Login from "./components/Login";
import Layout from "./views/Layout";
import RequestSingle from "./views/RequestSingle";
import { useState } from "react";
import { Employee } from "./types/types";
import UserContext from "./context/UserContext";
import UserCard from "./components/UserCard";
import EmployeeSingle from "./views/EmployeeSingle";

const App = () => {
  const [user, setUser] = useState<Employee>({
    _id: "",
    employeeName: "",
    privileges: "User",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<UserDashboard />}></Route>
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route path="/employees/:employeeId" element={<EmployeeSingle />}></Route>
            <Route
              path="/requests/:requestId"
              element={<RequestSingle />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
