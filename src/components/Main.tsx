import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "64px",
        marginLeft: "182px",
        padding: "20px 20px 0 40px",
        minHeight:'82.2vh',
        fontWeight:'bold'
      }}
    >
      <Outlet />
    </main>
  );
};

export default Main;
