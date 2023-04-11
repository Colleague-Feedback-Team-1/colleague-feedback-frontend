import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main
      style={{
        textAlign: "center",
      }}
    >
      <Outlet />
    </main>
  );
};

export default Main;
