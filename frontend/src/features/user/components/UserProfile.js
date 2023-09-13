import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useCurrency } from "../../../context/CurrencyContext";

export default function UserProfile() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  // useEffect(() => {}, [selectedCurrency]);
  console.log(userInfo);
  const handelCurrencyChange = (e) => {
    // console.log("lololo", .e);
    setSelectedCurrency(e.target.value);
  };

  return (
    <div>
      <div className="mx-auto mt-12  max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className=" px-4 py-6 sm:px-6">
          <h3 className="text-xl flex items-start justify-center flex-col my-5  tracking-tight ">
            <span className="md:text-3xl text-gray-600 font-semibold sm:text-2xl text-xl">
              Email Address
            </span>
            {userInfo?.email}
          </h3>
          {userInfo?.role === "admin" && (
            <h3 className="text-xl flex items-start justify-center flex-col my-5  tracking-tight">
              <span className="md:text-3xl text-gray-600 font-semibold sm:text-2xl text-xl">
                Role
              </span>
              {userInfo?.role}
            </h3>
          )}
        </div>
        {/*  */}
        <div>
          <label>
            <input
              type="radio"
              value="inr"
              name="currency"
              checked={selectedCurrency === "inr"}
              onClick={handelCurrencyChange}
            />
            INR
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="usd"
              name="currency"
              checked={selectedCurrency === "usd"}
              onClick={handelCurrencyChange}
            />
            USD
          </label>
          <br />
        </div>
        {/*  */}

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="rounded-md my-5  border border-black text-white bg-black hover:opacity-80 px-3 py-2 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              className=" px-1 py-4 mt-4"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-4">
                <div className="border-b border-gray-900/10 pb-8">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-black sm:w-1/3 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/10"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-0.5 text-sm text-gray-500">Your saved Addresses :</p>
          {userInfo?.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <form
                  className=" px-1 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-4">
                    <div className="border-b border-gray-900/10 pb-8">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Edit Your Personal Information
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="name"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is required",
                              })}
                              type="tel"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.56"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is required",
                              })}
                              id="state"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is required",
                              })}
                              id="pinCode"
                              className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full  p-2.5"
                            />
                            {errors.pincode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6  flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md  border w-full border-black/10 text-white bg-red-500 hover:bg-opacity-80  px-3 py-2 text-sm font-semibold text-grey  hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md w-full  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/10"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex justify-between gap-x-6 px-5 mb-4 rounded-lg  py-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4 ">
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
                <div className="flex flex-col items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-black hover:opacity-100 opacity-80"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-black hover:opacity-100 opacity-80"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
