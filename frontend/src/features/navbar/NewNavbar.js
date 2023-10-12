import React, { useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const line1 = "Ecntric India";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};
const letter = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function NewNavbar() {
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
      <div className="bg-accent text-primary  sm:pb-10 pb-16 w-full">
        {/* Code block starts */}
        <nav className="w-full mx-auto hidden xl:block  ">
          <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
            <div className="h-full flex items-center">
              <div className="mr-10 flex items-center">
                <motion.h3
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                  className="text-base text-primary font-bold tracking-normal leading-tight ml-3 hidden lg:block"
                >
                  {line1.split("").map((char, index) => {
                    return (
                      <motion.span key={char + " " + index} variants={letter}>
                        {char}
                      </motion.span>
                    );
                  })}
                </motion.h3>
              </div>
              <ul className="pr-12 xl:flex gap-x-10 items-center h-full hidden">
                <li className="cursor-pointer h-full flex items-center hover:text-black text-sm text-primary tracking-normal border-b-2 border-white">
                  <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer h-full flex items-center hover:text-black text-sm text-primary tracking-normal border-b-2 border-white">
                  <Link to="/my-orders">Orders</Link>
                </li>
                <li className="cursor-pointer h-full flex items-center hover:text-black text-sm text-primary tracking-normal border-b-2 border-white">
                  <Link to="/about">About</Link>
                </li>
                <li className="cursor-pointer h-full flex items-center hover:text-black text-sm text-primary tracking-normal border-b-2 border-white">
                  <Link to="/contact">Contact</Link>
                </li>
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
                <li className="cursor-pointer h-full flex items-center hover:text-black text-sm text-primary tracking-normal border-b-2 border-white">
                  <Link to="/cart">
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
                </li>
              </ul>
            </div>
            <div className="h-full xl:flex items-center justify-end hidden">
              <div className="w-full h-full flex items-center">
                <div className="w-full pr-12 h-full flex items-center border-gray-700 ">
                  <div className="relative w-full">
                    <div className="text-primary absolute ml-3 inset-0 m-auto w-4 h-4">
                      <AiOutlineSearch className="w-4 h-4" />
                    </div>
                    <input
                      placeholder="Search "
                      type="search"
                      onClick={handleClick}
                      id="simple-search"
                      className="bg-[#F2F2F2]   h-10 border border-gray-300 text-primary text-sm rounded-lg focus:ring-black/40 focus:border-black/40 block w-full pl-10 p-2.5 "
                      required
                    />
                  </div>
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
            <div className="flex items-center xl:hidden">
              <ul className="p-2 border-r bg-white absolute rounded top-0 left-0 right-0  mt-16 md:mt-16 hidden">
                <li className="flex md:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                  <div className="flex items-center">
                    <span className="ml-2 font-bold">Dashboard</span>
                  </div>
                </li>
                <li className="flex md:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                  <div className="flex items-center">
                    <span className="ml-2 font-bold">Products</span>
                  </div>
                </li>
                <li className="flex md:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                  <div className="flex items-center">
                    <span className="ml-2 font-bold">Performance</span>
                  </div>
                </li>
                <li className="border-b border-gray-300 flex md:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                  <span className="ml-2 font-bold">Deliverables</span>
                </li>
                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                  <div className="flex items-center">
                    <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                      <img
                        className="rounded h-10 w-10 object-cover"
                        src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png"
                        alt="logo"
                      />
                    </div>
                    <p className="text-sm ml-2 cursor-pointer">Jane Doe</p>
                    <div className="sm:ml-2 text-white relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down cursor-pointer"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </li>
                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={7} r={4} />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <span className="ml-2">Profile</span>
                  </div>
                </li>
                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-logout"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                  <span className="ml-2">Sign out</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:hidden   pr-12 h-full flex items-center border-gray-700 ">
            <div className="relative w-full">
              <div className="text-primary absolute ml-3 inset-0 m-auto w-4 h-4">
                <AiOutlineSearch className="w-4 h-4" />
              </div>
              <input
                placeholder="Search"
                type="search"
                onClick={handleClick}
                id="simple-search"
                className="bg-[#F2F2F2]   h-10 border border-gray-300 text-primary text-sm rounded-lg focus:ring-black/40 focus:border-black/40 block w-full pl-10 p-2.5 "
                required
              />
            </div>
          </div>
        </nav>
        {/* Navbar */}
        <nav>
          <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-accent fixed top-0 z-40">
            <div className="w-40">
              <h1>Ecentric India</h1>
            </div>
            <div>
              <div
                id="menu"
                className="text-primary"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  " "
                ) : (
                  <GiHamburgerMenu className="text-primary text-2xl cursor-pointer" />
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "absolute xl:hidden w-full h-full transform -translate-x-0 z-40"
                : "absolute xl:hidden w-full h-full transform -translate-x-full z-40"
            }
            id="mobile-nav"
          >
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed  overflow-y-auto  top-0 bg-accent  h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <p className="text-base cursor-pointer  text-primary ml-3">
                            Ecentric India
                          </p>
                        </div>
                        <div
                          id="cross"
                          className="text-primary"
                          onClick={() => setShow(!show)}
                        >
                          <AiOutlineClose className="text-xl cursor-pointer" />
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m">
                      <Link to="/" className="cursor-pointer">
                        <li className="text-white pt-10">
                          <div className="flex items-center">
                            <p className="text-primary xl:text-base text-base ml-3">
                              Home
                            </p>
                          </div>
                        </li>
                      </Link>
                      <Link to="/my-orders" className="cursor-pointer">
                        <li className="text-white pt-5">
                          <div className="flex items-center">
                            <p className="text-primary xl:text-base text-base ml-3">
                              Orders
                            </p>
                          </div>
                        </li>
                      </Link>
                      <Link to="/filters" className="cursor-pointer">
                        <li className="text-white pt-5">
                          <div className="flex items-center">
                            <p className="text-primary xl:text-base text-base ml-3">
                              Filters
                            </p>
                          </div>
                        </li>
                      </Link>
                      <Link to="/contact" className="cursor-pointer">
                        <li className="text-white pt-5">
                          <div className="flex items-center">
                            <p className="text-primary xl:text-base text-base ml-3">
                              Contact
                            </p>
                          </div>
                        </li>
                      </Link>

                      <Link to="/cart" className="cursor-pointer">
                        <li className="text-white pt-5">
                          <div className="flex items-center">
                            <p className="text-primary xl:text-base text-base ml-3">
                              Cart
                            </p>
                          </div>
                        </li>
                      </Link>
                      {userInfo && userInfo.role === "admin" ? (
                        <div
                          to="/admin-route"
                          className="flex px-3 items-center py-4 text-sm "
                        >
                          <div>
                            <div
                              className="flex items-center relative"
                              onClick={() => showAdmin(!admin)}
                            >
                              {admin && (
                                <ul className="p-2 w-40 border-r z-50 bg-accent  absolute rounded left-0  top-0 mt-8 ">
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

                              <p className="  text-base cursor-pointer">
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
                          <li className="cursor-pointer text-primary text-base leading-3 tracking-normal px-1 py-1  focus:text-black focus:outline-none flex items-center">
                            <span className="ml-2">Logout</span>
                          </li>
                        </Link>
                      ) : (
                        <>
                          <Link to="/login">
                            <li className="cursor-pointer text-primary text-base leading-3 tracking-normal px-1 py-1  focus:text-black focus:outline-none flex items-center">
                              <span className="ml-2">Login</span>
                            </li>
                          </Link>
                          <Link to="/signup">
                            <li className="cursor-pointer text-primary text-base leading-3 tracking-normal px-1 py-5  focus:text-black focus:outline-none flex items-center">
                              <span className="ml-2">Signup</span>
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
        {/* Sidebar ends */}

        {/* Code block ends */}
      </div>
    </>
  );
}
