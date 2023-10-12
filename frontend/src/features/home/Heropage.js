import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useState, useEffect } from "react";
import "./Heropage.css";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../user/userSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { useCurrency } from "../../context/CurrencyContext";
import { motion } from "framer-motion";

import cust1 from "../../assets/customer-1.jpg";
import cust2 from "../../assets/customer-2.jpg";
import cust3 from "../../assets/customer-3.jpg";
import cust4 from "../../assets/customer-4.jpg";


const HeroLmsSystem = () => {
  const [currency, showCurrency] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {}, [user]);
  // useEffect(() => {}, [selectedCurrency]);
  console.log(userInfo);
  const handelCurrencyChange = (e) => {
    // console.log("lololo", .e);
    setSelectedCurrency(e.target.value);
  };
  return (
    <>
      <div className="hero-image ">
        <div
          className="flex items-center "
          onClick={() => showCurrency(!currency)}
        >
          {currency && (
            <div className=" text-sm ml-2 fixed z-50 top-[600px]    ">
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
          )}
          {!currency && (
            <div className=" fixed z-50 left-[-25px] top-[600px]  flex">
              <button className="rotate-90 border px-2 py-2 rounded-md border-black/40">
                Currency
              </button>
            </div>
          )}
        </div>

        <div className="px-4  w-full  bg-gradient-to-t from-[#bebebe77] to-[#ffffff] flex flex-col  sm:h-screen h-full items-center justify-center sm:px-6 lg:px-8 py-24 space-y-8">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="block font-medium text-primary font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Unveil Nature's Essence: Explore Exquisite Natural Oils and
              Perfumes
            </h1>
          </div>

          <div className="max-w-3xl text-center mx-auto">
            <p className="sm:text-lg text-base text-gray">
              Your Gateway to Knowledge and Growth. Discover a world of
              comprehensive learning resources, expert guidance, and innovative
              tools designed to empower students and professionals alike on
              their educational journey.
            </p>
          </div>
          <div className="max-w-3xl text-center mx-auto">
            <div className="flex items-center flex-col gap-y-2 justify-center ">
              <div className="delivered-imgs flex ">
                <img
                  className="h-10 w-10 rounded-full"
                  src={cust1}
                  alt="Customer_photo"
                />
                <img
                  className="h-10 w-10 rounded-full"
                  src={cust2}
                  alt="Customer_photo"
                />
                <img
                  className="h-10 w-10 rounded-full"
                  src={cust3}
                  alt="Customer_photo"
                />
                <img
                  className="h-10 w-10 rounded-full"
                  src={cust4}
                  alt="Customer_photo"
                />
              </div>
              <p className="delivered-text">
                <span className="text-primary font-bold">2500+</span> Orders
                delivered last year!
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: document.querySelector("#Products").offsetTop,
                  behavior: "smooth",
                });
              }}
              className="btn  hover:shadow-red-500 "
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeroLmsSystem;
