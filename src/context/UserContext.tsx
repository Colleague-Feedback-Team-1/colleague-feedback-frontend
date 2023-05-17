import { createContext } from "react";
import { Employee } from "../types/types";
import { UserContextProps } from "../types/types";


const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export default UserContext;
