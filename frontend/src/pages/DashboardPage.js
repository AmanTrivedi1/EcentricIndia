import React from "react";
import Dashboard from "../features/dashboard/Dashboard";

import Footer from "../features/common/Footer";
import NewNavbar from "../features/navbar/NewNavbar";
const DashboardPage = () => {
  return (
    <>
      <NewNavbar />
      <Dashboard />
      <Footer />
    </>
  );
};

export default DashboardPage;
