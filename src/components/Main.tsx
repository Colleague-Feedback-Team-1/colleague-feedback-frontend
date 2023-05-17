import { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

const Main = () => {
  const { user } = useContext(UserContext);

  // check if main is in login page, then remove the marginLeft to center the login component
  const renderMain = () => {
    if (user == null) {
      return (
        <main
          style={{
            textAlign: "center",
            marginTop: "64px",
            padding: "20px 20px 0 40px",
            minHeight: "82.2vh",
            fontWeight: "bold",
          }}
        >
          <Outlet />
        </main>
      );
    } else {
      return (
        <main
          style={{
            textAlign: "center",
            marginTop: "64px",
            marginLeft: "182px",
            padding: "20px 20px 0 40px",
            minHeight: "82.2vh",
            fontWeight: "bold",
          }}
        >
          <Outlet />
        </main>
      );
    }
  };
  return <>{renderMain()}</>;
};

export default Main;
