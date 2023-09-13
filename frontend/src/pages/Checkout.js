import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import Product from "../features/product/components/Product";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/userSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectStatus,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { useCurrency } from "../context/CurrencyContext";

function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { selectedCurrency } = useCurrency();
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const currentOrder = useSelector(selectCurrentOrder);

  // const totalAmount = items.reduce(
  //   (amount, item) => item.product.discountPrice * item.quantity + amount,
  //   0
  // );
  const totalINRAmount = items.reduce(
    (amount, item) => item?.product?.discountPrice[0] * item?.quantity + amount,
    0
  );
  const totalUSDAmount = items.reduce(
    (amount, item) => item?.product?.discountPrice[1] * item?.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };
  // let totalOrderAmountInCurrency = 0;
  // useEffect(() => {
  //   if (selectedCurrency === "inr") {
  //     totalOrderAmountInCurrency = totalINRAmount;
  //   } else {
  //     totalOrderAmountInCurrency = totalUSDAmount;
  //   }
  // }, [selectedCurrency]);

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      let totalAmount = 0;
      {
        totalAmount =
          selectedCurrency === "inr" ? totalINRAmount : totalUSDAmount;
      }
      const order = {
        items,
        totalAmount,
        totalItems,
        user: user.id,
        paymentMethod,
        selectedAddress,
        currency: selectedCurrency,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      alert("Enter Address and Payment method");
    }
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {/* {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )} */}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )}

      {status === "loading" ? (
        <Product />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {/* This form is for address */}
              <form
                className=" px-5 py-4 mt-4"
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(
                    updateUserAsync({
                      ...user,
                      addresses: [...user.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div className="space-y-4">
                  <div className=" pb-8">
                    <h2 className="md:text-2xl text-xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>

                    <div className="mt-10  place-content-center grid grid-cols-1  gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>

                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>

                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>

                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>

                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>

                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>

                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>

                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 border-gray-300 bg-[#f2f2f2] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex w-full items-center justify-end gap-x-6">
                    <button
                      // onClick={e=>reset()}
                      type="button"
                      className="rounded-md w-full bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md w-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-b border-gray-900/10 pb-12">
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Your Saved Address
                </p>
                <ul className="flex flex-col  justify-center gap-y-4 ">
                  {user?.addresses?.map((address, index) => (
                    <li
                      key={index}
                      className="flex rounded-md justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>

                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onChange={handlePayment}
                          name="payments"
                          checked={paymentMethod === "card"}
                          value="card"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto mt-12  rounded-md shadow-lg  p-2 max-w-7xl px-2 sm:px-2 lg:px-4">
                <div className=" px-0 py-6 sm:px-0">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                    Payment Gateway
                  </h1>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y ">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24  flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full  object-contain object-center"
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
                                {selectedCurrency === "inr" ? (
                                  <p className="ml-4">
                                    &#8377; {item.product.discountPrice[0]}
                                  </p>
                                ) : (
                                  <p className="ml-4">
                                    $ {item.product.discountPrice[1].toFixed(2)}
                                  </p>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
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
                                  {[...Array(item.product.stock)].map(
                                    (e, i) => (
                                      <option key={i + 1}>{i + 1}</option>
                                    )
                                  )}
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, item.id)}
                                  type="button"
                                  className="font-medium text-black hover:opacity-80 "
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

                <div className=" px-2 py-6 sm:px-2">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    {selectedCurrency === "inr" ? (
                      <p>&#8377; {totalINRAmount}</p>
                    ) : (
                      <p>$ {totalUSDAmount.toFixed(2)}</p>
                    )}
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-80"
                    >
                      Order Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
