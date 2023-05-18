import { Navigate, Outlet } from "react-router-dom";
import { UserContextProps } from "../types/types";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const ProtectedRoute = () => {
  const { user, setUser } = useContext<UserContextProps>(UserContext);

  if (user==null) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
