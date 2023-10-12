import { Link } from "react-router-dom";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
const Footer = () => {
  return (
    <div>
      <Wrapper>
        <section className=" h-72 ">
          <div className="max-w-screen-xl px-4 h-72 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center -mx-5 -my-2">
              <div className="px-5 py-2">
                <Link
                  to="/"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Home
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link
                  to="my-orders"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Order
                </Link>
              </div>

              <div className="px-5 py-2">
                <Link
                  to="/about"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  About
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link
                  to="/contact"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Contact
                </Link>
              </div>
            </nav>
            <div className="flex justify-center mt-8 space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <FaFacebookF />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <FaInstagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <FaTwitter />
              </Link>
            </div>
            <p className="mt-8 text-base leading-6 text-center text-gray-400">
              © 2023 Incentric India, Inc. All rights reserved.
            </p>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default Footer;
