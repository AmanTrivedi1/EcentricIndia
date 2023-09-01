import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";
import { useCurrency } from "../../context/CurrencyContext";

export default function Cart() {
  const dispatch = useDispatch();
  const { selectedCurrency } = useCurrency();
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded);
  const [openModal, setOpenModal] = useState(null);

  const totalINRAmount = items.reduce(
    (amount, item) => item?.product?.discountPrice[0] * item?.quantity + amount,
    0
  );
  const totalUSDAmount = items.reduce(
    (amount, item) => item?.product?.discountPrice[1] * item?.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}

      <div>
        <div className="mx-auto mt-12 h-full  max-w-7xl px-4 flex   flex-col md:flex-row sm:px-6 lg:px-8">
          <div className=" w-full  border-0 md:border-r px-4 py-6 sm:px-6">
            <div className="flow-root">
              {status === "loading" ? <Loader /> : null}
              <ul className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item?.product?.thumbnail}
                        alt={item?.product?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          {selectedCurrency === "inr" ? (
                            <p className="ml-4">
                              &#8377; {item.product.discountPrice[0]}
                            </p>
                          ) : (
                            <p className="ml-4">
                              $ {item.product.discountPrice[1]}
                            </p>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          <span className="text-sm mr-2 text-[#87898B]">
                            Brand:
                          </span>
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 ">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            className="rounded-2xl border-black "
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            {[...Array(item.product.stock)].map((e, i) => (
                              <option key={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item.id}
                          ></Modal>
                          <button
                            onClick={(e) => {
                              setOpenModal(item.id);
                            }}
                            type="button"
                            className="font-medium text-red-500 hover:opacity-70"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full  px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              {selectedCurrency === "inr" ? (
                <p>&#8377; {totalINRAmount}</p>
              ) : (
                <p>$ {totalUSDAmount}</p>
              )}
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div>
              <div className="mt-4">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-black hover:opacity-80 px-6 py-3 text-base font-medium text-white shadow-sm "
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                <div className="flex flex-col">
                  <p>OR</p>
                  <Link to="/">
                    <button type="button" className="font-medium ">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
