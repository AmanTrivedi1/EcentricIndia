import React from "react";
import { Link } from "react-router-dom";

import { RxFileText } from "react-icons/rx";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { RxCardStackPlus } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
const AdminRoute = () => {
  return (
    <>
      <div className=" h-screen  gap-y-10 flex-col flex items-center justify-center">
        <div className="flex justify-between  ml-5 mr-5 h-16 rounded-xl sm:w-1/2 w-full items-center border border-black/40 hover:border-black ">
          <div className="flex gap-x-4 px-4 items-center flex-row-reverse ">
            <Link to="/dashboard">
              <p>Dashboard</p>
            </Link>
            <RxDashboard />
          </div>
          <div className="">
            <Link to="/">
              <AiOutlineArrowRight className="mr-10 h-5  cursor-pointer w-5  block  " />
            </Link>
          </div>
        </div>

        <div className="flex justify-between h-16 rounded-xl sm:w-1/2 w-full items-center border border-black/40 hover:border-black ">
          <div className="flex gap-x-4 px-4 items-center flex-row-reverse ">
            <Link to="/admin/product-form">
              <p>Add Products</p>
            </Link>
            <div>
              <Link to="/admin/product-form">
                <RxCardStackPlus />
              </Link>
            </div>
          </div>
          <div className="">
            <AiOutlineArrowRight className="mr-10 h-5  cursor-pointer w-5  block  " />
          </div>
        </div>
        <div className="flex justify-between h-16 rounded-xl w-1/2 items-center border border-black/40 hover:border-black ">
          <div className="flex gap-x-4 px-4 items-center flex-row-reverse ">
            <Link to="/admin">
              <p>Edit Products</p>
            </Link>
            <AiOutlineEdit />
          </div>
          <div className="">
            <Link to="/admin">
              <AiOutlineArrowRight className="mr-10 h-5  cursor-pointer w-5  block  " />
            </Link>
          </div>
        </div>

        <div className="flex justify-between h-16 rounded-xl w-1/2 items-center border border-black/40 hover:border-black ">
          <div className="flex gap-x-4 px-4 items-center flex-row-reverse ">
            <Link to="/admin/orders">
              <p>Orders</p>
            </Link>
            <RxFileText />
          </div>
          <div className="">
            <Link to="/admin/orders">
              <AiOutlineArrowRight className="mr-10 h-5  cursor-pointer w-5  block  " />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoute;
