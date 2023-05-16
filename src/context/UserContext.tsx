import { createContext } from "react";
import { UserContextProps } from "../types/types";

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  adminNoti: false,
  setAdminNoti: () => {},
});

export default UserContext;
