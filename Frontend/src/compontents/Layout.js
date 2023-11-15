import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div>
        <div style={{ marginTop: "80px" }}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
