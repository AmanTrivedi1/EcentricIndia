import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../../components/Product";
import { MdOutlineEditNote } from "react-icons/md";

import {
  fetchLoggedInUserOrderAsync,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  console.log(orders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <>
      {!orders ? (
        <h1 className="sm:text-3xl  flex flex-col-reverse gap-2 items-center h-screen justify-center px-4 text-xl">
          Please Order Something <MdOutlineEditNote className="text-2xl" />
        </h1>
      ) : (
        <div>
          {orders &&
            orders.map((order) => (
              <div key={order.id}>
                <div>
                  <div className="mx-auto mt-12  max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className=" px-4 py-6 sm:px-6">
                      <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-600">
                        Order Id: <span className="text-black">{order.id}</span>
                      </h1>
                      <h3 className="text-xl my-5 font-semibold tracking-tight text-gray-600">
                        Order Status :{" "}
                        <span className="text-black">{order.status}</span>
                      </h3>
                      <h3 className="text-xl flex items-center justify-start gap-x-2 my-5 font-semibold tracking-tight text-gray-600">
                        Tracking Id:
                        <a
                          className="font-medium text-blue-600 text-sm dark:text-blue-500 hover:underline"
                          href={order.trackingLink}
                          target="_blank" // This opens the link in a new tab/window
                        >
                          {order.trackingLink}
                        </a>
                      </h3>
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.product.id}>
                                        {item.product.title}
                                      </a>
                                    </h3>
                                    {orders.currency === "inr" ? (
                                      <p className="ml-4">
                                        &#8377; {item.product.discountPrice[0]}
                                      </p>
                                    ) : (
                                      <p className="ml-4">
                                        $
                                        {item.product.discountPrice[1].toFixed(
                                          2
                                        )}
                                      </p>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.product.brand}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500">
                                    <label
                                      htmlFor="quantity"
                                      className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Qty :{item.quantity}
                                    </label>
                                  </div>
                                  <div className="flex"></div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="0 px-4 py-6 sm:px-6">
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        {orders.currency === "inr" ? (
                          <p>&#8377; {order.totalAmount}</p>
                        ) : (
                          <p>$ {order.totalAmount.toFixed(2)}</p>
                        )}
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total Items in Cart</p>
                        <p>{order.totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping Address :
                      </p>
                      <div className="flex justify-between mt-4 rounded-md gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                        <div className="flex gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {order.selectedAddress.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {order.selectedAddress.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {order.selectedAddress.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {status === "loading" ? <Product /> : null}
        </div>
      )}
    </>
  );
}
