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
      <div className="mx-auto  m-auto left-0 right-0 top-0 bottom-0 max-w-2xl  py-3  sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="sm:h-screen h-full  flex flex-col items-center">
          <div>
            <h1 className="text-center font-semibold text-3xl md:mt-14 ">
              Dashboard
            </h1>
          </div>
          <div className=" items-center grid  grid-cols-1 sm:grid-cols-2 ">
            <div className="flex items-center flex-col gap-y-4">
              <div className="sm:text-2xl border-b inline-block border-b-black/40   text-xl font-semibold">
                <h1 className="text-center sm:mt-0 mt-10 mb-2  font-semibold text-xl ">
                  Payment Status
                </h1>
                {data?.orderPaymentStatus?.map((daata) => (
                  <div
                    key={Math.random()}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <p className="text-center text-base capitalize">
                      {daata._id}:
                    </p>
                    <p className="text-center text-base">{daata.count}</p>
                  </div>
                ))}
              </div>
              <div className="sm:text-2xl border-b inline-block border-b-black/40   text-xl font-semibold">
                <h1 className="text-center sm:mt-0 mt-10 mb-2  font-semibold text-xl ">
                  Order Status
                </h1>
                {data?.orderStatus?.map((daata) => (
                  <div
                    key={Math.random()}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <p className="text-center text-base capitalize">
                      {daata._id}:
                    </p>
                    <p className="text-center text-base">{daata.count}</p>
                  </div>
                ))}
              </div>
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
              <div className=" w-56 h-24 border rounded-lg hover:border-black cursor-pointer flex flex-col items-center justify-center border-black/40  ">
                <h1 className="sm:text-2xl text-xl">Total Earning</h1>
                <div className="sm:text-2xl text-xl font-semibold">
                  {data?.orderPrice?.map((daata) => (
                    <div key={Math.random()}>{daata.totalAmount}</div>
                  ))}
                </div>
              </div>
              <div className=" w-56 h-24 border rounded-lg hover:border-black cursor-pointer flex flex-col items-center justify-center border-black/40  ">
                <h1 className="sm:text-2xl text-xl">Delivered </h1>
                <div className="sm:text-2xl text-xl font-semibold">
                  {data?.orderPrice?.map((daata) => (
                    <div key={Math.random()}>
                      <p>{daata.count}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" w-56 h-32 border rounded-lg hover:border-black cursor-pointer flex flex-col items-center justify-center border-black/40  ">
                <h1 className="sm:text-2xl text-xl">Total User</h1>
                <div className="flex flex-col items-start justify-center">
                  <div className="sm:text-2xl    text-xl font-semibold">
                    {data?.userCount?.map((daata) => (
                      <div
                        key={Math.random()}
                        className="flex items-center justify-center gap-x-2"
                      >
                        <p className="text-center">{daata._id}:</p>
                        <p className="text-center">{daata.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
