import { useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineDown,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { selectUserInfo } from "../user/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Filter(props) {
  const [searchProduct, setSearchProduct] = useState("");
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectLoggedInUser);
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  const handleSearch = (e) => {
    console.log(e.target.value);
    props.handleSearch(e.target.value);
    setSearchProduct(e.target.value);
  };

  return (
    <>
      <div className=" ">
        {/* Code block starts */}
        <nav className="   xl:block hidden">
          <div className="">
            <div className="flex items-center justify-between mx-20">
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-between">
                <div className="flex  items-center hover:text-dark">
                  <h2 className="hidden font-bold text-xl  sm:block  text-black  leading-normal pl-20">
                    Ecentric india
                  </h2>
                </div>

                <form class="flex items-center ml-20">
                  <label for="simple-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AiOutlineSearch className="w-4 h-4" />
                    </div>
                    <input
                      placeholder="Search "
                      type="search"
                      value={searchProduct}
                      onChange={handleSearch}
                      className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full pl-10 p-2.5 "
                    />
                  </div>
                </form>
              </div>
              <div className="flex">
                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                  <Link
                    to="/"
                    className="flex px-5  items-center py-6 text-sm "
                  >
                    Home
                  </Link>
                  <Link
                    to="/my-orders"
                    className="flex px-5  items-center py-6 text-sm "
                  >
                    Orders
                  </Link>
                  <Link
                    key="Products"
                    to="/filters"
                    className="flex  px-5 items-center py-6 text-sm "
                  >
                    Filters
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
                  <Link
                    to="/profile"
                    className="flex px-5  items-center py-6 text-sm "
                  >
                    Profile
                  </Link>
                  {userInfo && userInfo.role === "admin" ? (
                    <Link
                      to="/admin-route"
                      className="flex px-5 items-center py-6 text-sm "
                    >
                      Admin
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link
                    to="/cart"
                    className="flex px-5 items-center py-6 text-sm "
                  >
                    <MdOutlineShoppingCartCheckout className="text-2xl" />
                  </Link>
                </div>
                <div className="hidden xl:flex items-center">
                  <div className="ml-6 relative">
                    <div
                      className="flex items-center relative"
                      onClick={() => setProfile(!profile)}
                    >
                      {profile && (
                        <ul className="p-2 w-40 border-r z-30 bg-[#F2F2F2]  absolute rounded right-0 shadow top-0 mt-16 ">
                          {!user && (
                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-black focus:text-black focus:outline-none">
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
                              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-black focus:text-black focus:outline-none flex items-center">
                                <AiOutlineProfile />
                                <span className="ml-2">Signup</span>
                              </li>
                            </Link>
                          )}
                          {user && (
                            <Link to="/logout">
                              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-1 py-1 hover:text-black focus:text-black focus:outline-none flex items-center">
                                <AiOutlineProfile />
                                <span className="ml-2">Logout</span>
                              </li>
                            </Link>
                          )}
                        </ul>
                      )}
                      <div className="cursor-pointer flex items-center justify-center">
                        <div className=" flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                          <AiOutlineUser className="text-xl" />
                        </div>
                        <div className="ml-2 text-gray-600">
                          <AiOutlineDown className="text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="py-4 px-6 w-full flex xl:hidden sticky justify-between items-center  top-0 z-40">
            <div className="w-full">
              <h1>Ecentric India</h1>
            </div>
            <div className="flex items-center">
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
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full xl:hidden fixed h-full  z-40  transform  translate-x-0 "
                : "   w-full xl:hidden h-full absolute z-40  transform -translate-x-full"
            }
          >
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40  overflow-y-auto  bg-white top-[-56px] absolute  shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <h1>Ecentric india</h1>
                        </div>
                        <div
                          id="cross"
                          className="text-gray-800"
                          onClick={() => setShow(!show)}
                        >
                          <AiOutlineClose />
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
                      <Link to="/filters" className="cursor-pointer">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <p className="">Products</p>
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
                              <p className="">My Profile</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      {userInfo && userInfo.role === "admin" ? (
                        <Link to="/admin-route" className="cursor-pointer">
                          <li className="text-gray-800 pt-6">
                            <div className="flex items-center hover:text-dark translate-x-0  ">
                              <div className="flex justify-center items-center gap-x-4">
                                <p className="">Admin</p>
                              </div>
                            </div>
                          </li>
                        </Link>
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
    </>
  );
}

export default Filter;
