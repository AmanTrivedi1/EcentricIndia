import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { selectUserInfo } from "../user/userSlice";
import { AiOutlineUser } from "react-icons/ai";
const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar(props) {
  const [searchProduct, setSearchProduct] = useState("");
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  const handleSearch = (e) => {
    console.log(e.target.value);
    props.handleSearch(e.target.value);
    setSearchProduct(e.target.value);
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-[#010101]">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="h-8 w-8"
                          src="/ecommerce.png"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    {userInfo ? (
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          <Link
                            key="Products"
                            to="/"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            aria-current="page"
                          >
                            Products
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="search"
                      value={searchProduct}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {userInfo &&
                        (
                          <Link to="/cart">
                            <button
                              type="button"
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <ShoppingCartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </Link>
                        )[
                          items.length > 0 && (
                            <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              {items.length}
                            </span>
                          )
                        ]}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={userInfo?.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        {userInfo ? (
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        ) : (
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {/* {userNavigation.map((item) => ( */}
                              <Menu.Item key="Log In">
                                {/* {({ active }) => ( */}
                                <Link
                                  to="/login"
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Log In
                                </Link>
                                {/* )} */}
                              </Menu.Item>
                              {/* ))} */}
                            </Menu.Items>
                          </Transition>
                        )}
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <AiOutlineUser className="h-10 w-10 rounded-full" />

                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {/* this should come from userInfo */}
                        {/* {userInfo?.name} */}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {/* {userInfo?.email} */}
                      </div>
                    </div>
                    <Link to="/cart">
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-Commerce
            </h1>
          </div>
        </header>
        {/* <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main> */}
      </div>
    </>
  );
}

export default NavBar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectItems } from "../cart/cartSlice";
// import { selectLoggedInUser } from "../auth/authSlice";
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

// const Navbar = () => {
//   const items = useSelector(selectItems);
//   const userInfo = useSelector(selectUserInfo);
//   const [show, setShow] = useState(null);
//   const [profile, setProfile] = useState(false);
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
