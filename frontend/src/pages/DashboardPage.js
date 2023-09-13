import React from "react";
import Dashboard from "../features/dashboard/Dashboard";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <Dashboard />
      <Footer />
    </>
  );
};

export default DashboardPage;
