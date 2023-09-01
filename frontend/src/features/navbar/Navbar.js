import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineDown,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";
import { BsChatDots } from "react-icons/bs";
import { TbPrompt } from "react-icons/tb";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";

// const navigation = [
//   { name: "Products", link: "/", user: true },
//   { name: "Products", link: "/admin", admin: true },
//   { name: "Orders", link: "/admin/orders", admin: true },
// ];
// const userNavigation = [
//   { name: "My Profile", link: "/profile" },
//   { name: "My Orders", link: "/my-orders" },
//   { name: "Sign out", link: "/logout" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar(props) {
  const [searchProduct, setSearchProduct] = useState("");
  // const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();

  function handleClick(e) {
    navigate("/filters");
  }

  const handleSearch = (e) => {
    console.log(e.target.value);
    props.handleSearch(e.target.value);
    setSearchProduct(e.target.value);
  };

  return (
    <>
      <div className=" z-50  h-9">
        {/* Code block starts */}
        <nav className="  xl:block hidden">
          <div className="">
            <div className="flex items-center justify-between mx-20">
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-between">
                <div className="flex  items-center hover:text-dark">
                  <h2 className="hidden font-bold text-xl  sm:block  text-black  leading-normal pl-20">
                    Ecentric india
                  </h2>
                </div>

                <form className="flex items-center ml-20">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AiOutlineSearch className="w-4 h-4" />
                    </div>
                    <input
                      placeholder="Search "
                      type="search"
                      value={searchProduct}
                      onChange={handleClick}
                      id="simple-search"
                      className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black block w-full pl-10 p-2.5 "
                      required
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
                  <Link
                    to="/cart"
                    className="flex px-5 items-center py-6 text-sm "
                  >
                    Cart
                  </Link>
                </div>

                <div className="hidden xl:flex items-center">
                  <div className="ml-6 relative">
                    <div
                      className="flex items-center relative"
                      onClick={() => setProfile(!profile)}
                    >
                      {profile && (
                        <ul className="p-2 w-40 border-r z-30 bg-white absolute rounded right-0 shadow top-0 mt-16 ">
                          {!userInfo && (
                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                              <div className="flex items-center">
                                <AiOutlineLogin />
                                <Link to="/login">
                                  <span className="ml-2">Login</span>
                                </Link>
                              </div>
                            </li>
                          )}
                          {!userInfo && (
                            <Link to="/signup">
                              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                                <AiOutlineProfile />
                                <span className="ml-2">Signup</span>
                              </li>
                            </Link>
                          )}
                          {userInfo && (
                            <Link to="/logout">
                              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
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
          <div className="py-4 px-6 w-full flex xl:hidden sticky justify-between items-center bg-white  top-0 z-40">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full xl:hidden h-full absolute z-40  transform  translate-x-0 "
                : "   w-full xl:hidden h-full absolute z-40  transform -translate-x-full"
            }
          >
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40  overflow-y-auto  top-[-56px] absolute bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
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
                              <AiOutlineHome />
                              <p className="">Home</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <Link to="/filters" className="cursor-pointer">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <TbPrompt />
                              <p className="">Products</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <Link className="cursor-pointer">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <BsChatDots />
                              <p className="">About</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <Link to="/contact">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <GrContactInfo />
                              <p className="">Contact</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <Link to="/login">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <AiOutlineLogin />
                              <p className="">Login</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <Link to="/login">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <AiOutlineProfile />
                              <p className="">Signup</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <Link to="/account">
                        <li className="text-gray-800 pt-6">
                          <div className="flex items-center hover:text-dark translate-x-0  ">
                            <div className="flex justify-center items-center gap-x-4">
                              <AiOutlineProfile />
                              <p className="">My Profile</p>
                            </div>
                          </div>
                        </li>
                      </Link>
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

export default NavBar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectItems } from "../cart/cartSlice";

// import { selectUserInfo } from "../user/userSlice";
// import {
//   AiOutlineHome,
//   AiOutlineLogin,
//   AiOutlineProfile,
//   AiOutlineDown,
//   AiOutlineUser,
//   AiOutlineClose,
// } from "react-icons/ai";
// import { BsChatDots } from "react-icons/bs";
// import { TbPrompt } from "react-icons/tb";
// import { GrContactInfo } from "react-icons/gr";

// const Navbar = ({ props }) => {
//   const items = useSelector(selectItems);
//   const userInfo = useSelector(selectUserInfo);
//   const [searchProduct, setSearchProduct] = useState("");
//   const [show, setShow] = useState(null);
//   const [profile, setProfile] = useState(false);

//   const handleSearch = (e) => {
//     console.log(e.target.value);
//     props.handleSearch(e.target.value);
//     setSearchProduct(e.target.value);
//   };
//   return (
//     <>
//       <div className=" ">
//         {/* Code block starts */}
//         <nav className="bg-white    xl:block hidden">
//           <div className="">
//             <div className="flex items-center justify-between mx-20">
//               <div className="inset-y-0 left-0 flex items-center justify-between xl:hidden"></div>
//               <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-between">
//                 <div className="flex items-center hover:text-dark">
//                   <h2 className="hidden sm:block text-base text-gray-700  leading-normal pl-3">
//                     Ecentric india
//                   </h2>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div>
//                   <input
//                     type="search"
//                     value={searchProduct}
//                     onChange={handleSearch}
//                   />
//                 </div>

//                 <div className="hidden xl:flex md:mr-6 xl:mr-16">
//                   <Link
//                     to="/"
//                     className="flex px-5  items-center py-6 text-sm "
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     key="Products"
//                     to="/"
//                     className="flex  px-5 items-center py-6 text-sm "
//                   >
//                     Products
//                   </Link>
//                   <Link
//                     to="/about"
//                     className="flex px-5 items-center py-6 text-sm "
//                   >
//                     About
//                   </Link>
//                   <Link
//                     to="/contact"
//                     className="flex px-5 items-center py-6 text-sm "
//                   >
//                     Contact
//                   </Link>
//                   <Link
//                     to="/cart"
//                     className="flex px-5 items-center py-6 text-sm "
//                   >
//                     Cart
//                   </Link>
//                 </div>
//                 <div className="hidden xl:flex items-center">
//                   <div className="ml-6 relative">
//                     <div
//                       className="flex items-center relative"
//                       onClick={() => setProfile(!profile)}
//                     >
//                       {profile && (
//                         <ul className="p-2 w-40 border-r z-30 bg-white absolute rounded right-0 shadow top-0 mt-16 ">
//                           <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
//                             <div className="flex items-center">
//                               <AiOutlineLogin />
//                               <Link to="/login">
//                                 <span className="ml-2">Login</span>
//                               </Link>
//                             </div>
//                           </li>
//                           <Link to="/login">
//                             <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
//                               <AiOutlineProfile />
//                               <span className="ml-2">Signup</span>
//                             </li>
//                           </Link>
//                           <Link to="/logout">
//                             <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
//                               <AiOutlineProfile />
//                               <span className="ml-2">Logout</span>
//                             </li>
//                           </Link>
//                         </ul>
//                       )}
//                       <div className="cursor-pointer flex items-center justify-center">
//                         <div className=" flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
//                           <AiOutlineUser className="text-xl" />
//                         </div>
//                         <div className="ml-2 text-gray-600">
//                           <AiOutlineDown className="text-sm" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <nav>
//           <div className="py-4 px-6 w-full flex xl:hidden sticky justify-between items-center bg-white  top-0 z-40">
//             <div className="w-full">
//               <h1>Ecentric India</h1>
//             </div>
//             <div className="flex items-center">
//               <div
//                 id="menu"
//                 className="text-gray-800"
//                 onClick={() => setShow(!show)}
//               >
//                 {show ? (
//                   ""
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="icon icon-tabler icon-tabler-menu-2"
//                     width={24}
//                     height={24}
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                     <line x1={4} y1={6} x2={20} y2={6} />
//                     <line x1={4} y1={12} x2={20} y2={12} />
//                     <line x1={4} y1={18} x2={20} y2={18} />
//                   </svg>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/*Mobile responsive sidebar*/}
//           <div
//             className={
//               show
//                 ? "w-full xl:hidden h-full absolute z-40  transform  translate-x-0 "
//                 : "   w-full xl:hidden h-full absolute z-40  transform -translate-x-full"
//             }
//           >
//             <div
//               className="bg-gray-800 opacity-50 w-full h-full"
//               onClick={() => setShow(!show)}
//             />
//             <div className="w-64 z-40  overflow-y-auto  top-[-56px] absolute bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
//               <div className="px-6 h-full">
//                 <div className="flex flex-col justify-between h-full w-full">
//                   <div>
//                     <div className="mt-6 flex w-full items-center justify-between">
//                       <div className="flex items-center justify-between w-full">
//                         <div className="flex items-center">
//                           <h1>Ecentric india</h1>
//                         </div>
//                         <div
//                           id="cross"
//                           className="text-gray-800"
//                           onClick={() => setShow(!show)}
//                         >
//                           <AiOutlineClose />
//                         </div>
//                       </div>
//                     </div>
//                     <ul className=" flex flex-col items-start">
//                       <Link to="/" className="cursor-pointer">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <AiOutlineHome />
//                               <p className="">Home</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                       <Link className="cursor-pointer">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <TbPrompt />
//                               <p className="">Products</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                       <Link className="cursor-pointer">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <BsChatDots />
//                               <p className="">About</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                       <Link to="/contact">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <GrContactInfo />
//                               <p className="">Contact</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                       <Link to="/login">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <AiOutlineLogin />
//                               <p className="">Login</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                       <Link to="/login">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <AiOutlineProfile />
//                               <p className="">Signup</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                       <Link to="/account">
//                         <li className="text-gray-800 pt-6">
//                           <div className="flex items-center hover:text-dark translate-x-0  ">
//                             <div className="flex justify-center items-center gap-x-4">
//                               <AiOutlineProfile />
//                               <p className="">My Profile</p>
//                             </div>
//                           </div>
//                         </li>
//                       </Link>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//         {/* Code block ends */}
//       </div>
//     </>
//   );
// };

// export default Navbar;
