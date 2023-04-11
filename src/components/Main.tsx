import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main
      style={{
        textAlign: "center",
        marginTop: '64px',
        marginLeft: '182px',
        padding: '20px'
      }}
    >
      <Outlet />
    </main>
  );
};

export default Main;
