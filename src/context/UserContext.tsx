import { createContext } from "react";
import { Employee } from "../types/types";

interface UserContextProps {
  user: Employee;
  setUser: (user: Employee) => void;
}

const UserContext = createContext<UserContextProps>({
  user: { employeeId: "", employeeName: "", privileges: "User" },
  setUser: () => {},
});

export default UserContext;
