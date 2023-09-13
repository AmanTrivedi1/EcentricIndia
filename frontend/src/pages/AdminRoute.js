import React from "react";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Admin from "../features/admin/AdminRoute";
const AdminRoute = () => {
  return (
    <>
      <NavBar />
      <Admin />
      <Footer />
    </>
  );
};

export default AdminRoute;
