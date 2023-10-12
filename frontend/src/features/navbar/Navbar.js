import { useState, useEffect } from "react";
import {
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineClose,
} from "react-icons/ai";

import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Wrapper from "../common/Wrapper";
function NavBar(props) {
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectLoggedInUser);
  const [show, setShow] = useState(null);

  const [admin, showAdmin] = useState(false);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();

  function handleClick(e) {
    navigate("/filters");
  }
  return (
    <>
      <Wrapper>
        <div className=" z-50  h-20     mb-30 sm:mb-20 bg-accent  ">
          {/* Code block starts */}
          <nav className="  xl:block hidden">
            <div className="">
              <div className="flex items-center justify-between mx-20">
                <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-between">
                  <div className="flex  items-center hover:text-dark">
                    <h2 className="hidden font-bold text-xl  sm:block  text-black  leading-normal ">
                      Ecentric India
                    </h2>
                  </div>
                  <form className="flex items-center  ml-20">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative block w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineSearch className="w-4 h-4" />
                      </div>
                      <input
                        placeholder="Search "
                        type="search"
                        onClick={handleClick}
                        id="simple-search"
                        className="bg-[#F2F2F2]   h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black block w-full pl-10 p-2.5 "
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="flex">
                  <div className="hidden xl:flex md:mr-6 xl:mr-16">
                    <Link
                      to="/"
                      className="flex px-5 items-center py-6 text-sm "
                    >
                      Home
                    </Link>
                    <Link
                      to="/my-orders"
                      className="flex px-5 items-center py-6 text-sm "
                    >
                      Orders
                    </Link>

                    <Link
                      to="/about"
                      className="flex px-5 items-center py-6 text-sm "
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className="flex px-5 items-center py-6 text-sm "
                    >
                      Contact
                    </Link>

                    {userInfo && userInfo.role === "admin" ? (
                      <div
                        to="/admin-route"
                        className="flex px-5 items-center py-6 text-sm "
                      >
                        <div>
                          <div
                            className="flex items-center relative"
                            onClick={() => showAdmin(!admin)}
                          >
                            {admin && (
                              <ul className="p-2 w-40 border-r z-30 bg-[#F2F2F2]  absolute rounded right-0  top-0 mt-8 ">
                                <Link to="/dashboard">
                                  <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2  hover:text-black focus:text-black focus:outline-none flex items-center">
                                    <span className="ml-2">Dashboard</span>
                                  </li>
                                </Link>
                                <Link to="/admin/product-form">
                                  <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-black focus:text-black focus:outline-none flex items-center">
                                    <span className="ml-2">Add Product</span>
                                  </li>
                                </Link>

                                <Link to="/admin">
                                  <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-1 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                    <span className="ml-2">Edit Product</span>
                                  </li>
                                </Link>
                                <Link to="/admin/orders">
                                  <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-1 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                    <span className="ml-2">Orders</span>
                                  </li>
                                </Link>
                              </ul>
                            )}
                            <div className="cursor-pointer">Admin</div>
                            <IoIosArrowDown />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <Link
                      to="/cart"
                      className="flex px-5 items-center py-6 text-sm "
                    >
                      <svg
                        className="fill-stroke text-black"
                        width={20}
                        height={22}
                        viewBox="0 0 20 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 5H19"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="hidden xl:flex items-center">
                    <div className="ml-6 relative">
                      <div
                        className="flex items-center relative"
                        onClick={() => setProfile(!profile)}
                      >
                        {profile && (
                          <ul className="p-2 w-40 border-r z-60 bg-accent  absolute rounded right-0  top-0 mt-10 ">
                            {!user && (
                              <li className="cursor-pointer text-gray-600 text-sm mb-2 leading-3 tracking-normal mt-1 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                <div className="flex items-center">
                                  <AiOutlineLogin />
                                  <Link to="/login">
                                    <span className="ml-2">Login</span>
                                  </Link>
                                </div>
                              </li>
                            )}
                            {!user && (
                              <Link to="/signup">
                                <li className="cursor-pointer text-gray-600 text-sm leading-3  tracking-normal mt-2  hover:text-black focus:text-black focus:outline-none flex items-center">
                                  <AiOutlineProfile />
                                  <span className="ml-2">Signup</span>
                                </li>
                              </Link>
                            )}
                            {user && (
                              <div>
                                <Link to="/logout">
                                  <li className="cursor-pointer text-gray-600  text-sm leading-3 tracking-normal mt-2 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                    <AiOutlineProfile />
                                    <span className="ml-2">Logout</span>
                                  </li>
                                </Link>
                                <Link to="/profile">
                                  <li className="cursor-pointer text-gray-600  text-sm leading-3 tracking-normal mt-2 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                    <CgProfile />
                                    <span className="ml-2">Profile</span>
                                  </li>
                                </Link>
                              </div>
                            )}
                          </ul>
                        )}
                        <div className="cursor-pointer flex items-center justify-center">
                          <div className=" flex text-sm items-center justify-center  border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                            <svg
                              className="fill-stroke text-black"
                              width={18}
                              height={20}
                              viewBox="0 0 18 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <IoIosArrowDown />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <nav className="bg-accent">
            <div className="flex   gap-x-2 xl:hidden items-center justify-between px-1 py-2  ">
              <div className="">
                <h1 className=" font-semibold hidden sm:block">
                  Ecentric India
                </h1>
                <h1 className="  block sm:hidden text-xl font-semibold ">
                  EIndia
                </h1>
              </div>
              <form className="flex sm:block hidden items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative block w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch className="w-4 h-4" />
                  </div>
                  <input
                    placeholder="Search "
                    type="search"
                    onClick={handleClick}
                    id="simple-search"
                    className="bg-[#F2F2F2]   h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black block w-full pl-10 p-2.5 "
                    required
                  />
                </div>
              </form>
              <div className="">
                <div
                  id="menu"
                  className="text-gray-800"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    ""
                  ) : (
                    <GiHamburgerMenu className="text-2xl cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
            <div className="px-1  mb-[-20px]">
              <form className="flex  block sm:hidden  items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative block w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch className="w-4 h-4" />
                  </div>
                  <input
                    placeholder="Search "
                    type="search"
                    onClick={handleClick}
                    id="simple-search"
                    className="bg-[#F2F2F2]   h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black block w-full pl-10 p-2.5 "
                    required
                  />
                </div>
              </form>
            </div>
            {/*Mobile responsive sidebar*/}
            <div
              className={
                show
                  ? "w-full xl:hidden   h-full  z-50  absolute  transform  translate-x-0 "
                  : "  w-full xl:hidden  h-full absolute z-50 transform -translate-x-full"
              }
            >
              <div className=" w-full h-full" onClick={() => setShow(!show)} />
              <div className="w-64 z-100  overflow-y-auto left-[-30px]  top-[-70px] fixed  h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                <div className="px-8  h-full">
                  <div className="flex flex-col justify-between  h-full w-full">
                    <div>
                      <div className="mt-6 flex w-full items-center justify-between">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <h1 className="font-bold">Ecentric india</h1>
                          </div>
                          <div
                            id="cross"
                            className="text-gray-800"
                            onClick={() => setShow(!show)}
                          >
                            <AiOutlineClose className="text-xl cursor-pointer" />
                          </div>
                        </div>
                      </div>
                      <ul className=" flex flex-col items-start">
                        <Link to="/" className="cursor-pointer">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">Home</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                        <Link to="/my-orders" className="cursor-pointer">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">orders</p>
                              </div>
                            </div>
                          </li>
                        </Link>

                        <Link to="/filters">
                          <li
                            onClick={handleClick}
                            className="text-gray-800 pt-6"
                          >
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">Filters</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                        <Link className="cursor-pointer">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">About</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                        <Link to="/contact">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">Contact</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                        <Link to="/profile">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">Profile</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                        <Link to="/cart">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">Cart</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                        {userInfo && userInfo.role === "admin" ? (
                          <div
                            to="/admin-route"
                            className="flex px-5 items-center py-6 text-sm "
                          >
                            <div>
                              <div
                                className="flex items-center relative"
                                onClick={() => showAdmin(!admin)}
                              >
                                {admin && (
                                  <ul className="p-2 w-40 border-r z-50  rounded left-0  top-0 mt-8 ">
                                    <Link to="/dashboard">
                                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2  hover:text-black focus:text-black focus:outline-none flex items-center">
                                        <span className="ml-2">Dashboard</span>
                                      </li>
                                    </Link>
                                    <Link to="/admin/product-form">
                                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-black focus:text-black focus:outline-none flex items-center">
                                        <span className="ml-2">
                                          Add Product
                                        </span>
                                      </li>
                                    </Link>

                                    <Link to="/admin">
                                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-1 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                        <span className="ml-2">
                                          Edit Product
                                        </span>
                                      </li>
                                    </Link>
                                    <Link to="/admin/orders">
                                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-1 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                        <span className="ml-2">Orders</span>
                                      </li>
                                    </Link>
                                  </ul>
                                )}

                                <p className="ml-[-20px] mb-[-20px] cursor-pointer">
                                  Admin
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {user ? (
                          <Link to="/logout">
                            <li className="text-gray-800 pt-6">
                              <div className="flex items-center hover:text-dark translate-x-0  ">
                                <div className="flex justify-center items-center gap-x-4">
                                  <p className="">Logout</p>
                                </div>
                              </div>
                            </li>
                          </Link>
                        ) : (
                          <>
                            <Link to="/login">
                              <li className="text-gray-800 pt-6">
                                <div className="flex items-center hover:text-dark translate-x-0  ">
                                  <div className="flex justify-center items-center gap-x-4">
                                    <p className="">Login</p>
                                  </div>
                                </div>
                              </li>
                            </Link>
                            <Link to="/login">
                              <li className="text-gray-800 pt-6">
                                <div className="flex items-center hover:text-dark translate-x-0  ">
                                  <div className="flex justify-center items-center gap-x-4">
                                    <p className="">Signup</p>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {/* Code block ends */}
        </div>
      </Wrapper>
    </>
  );
}

export default NavBar;
