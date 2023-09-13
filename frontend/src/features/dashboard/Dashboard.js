import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const fetchDashboardData = () => {
    fetch("/dashboard/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="h-screen  flex flex-col items-center">
        <div>
          <h1 className="text-center font-semibold text-3xl mt-14">
            Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap mt-10 gap-x-10 gap-y-10 container items-center justify-center">
          <div className=" w-56 h-24 border rounded-lg hover:border-black cursor-pointer flex flex-col items-center justify-center border-black/40   ">
            <h1 className="sm:text-2xl text-xl">Total Orders</h1>
            <p className="sm:text-2xl text-xl font-semibold">
              {data.ordersCount}
            </p>
          </div>
          <div className=" w-56 h-24 border rounded-lg hover:border-black cursor-pointer flex flex-col items-center justify-center border-black/40  ">
            <h1 className="sm:text-2xl text-xl">Total Products</h1>
            <p className="sm:text-2xl text-xl font-semibold">
              {data.productsCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
