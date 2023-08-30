import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { AiOutlineArrowRight } from "react-icons/ai";
function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_3v9ic5v",
        "template_hqmiwxy",
        form.current,
        "KW11fcCDBdJ-H3etP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div className=" h-full md:h-screen  p-10 flex  md:flex-row flex-col-reverse   items-center justify-center">
        <div className=" flex  w-full flex-col items-center justify-center gap-y-10">
          <div className="flex  gap-y-2 w-72 flex-col border   rounded-lg p-4 items-center justify-center ">
            <h1 className="font-bold text-lg ">Email Contact</h1>
            <p>Ecentricindia@gmail.com</p>
            <button className="flex border hover:border-black  rounded-lg p-2 items-center justify-center gap-x-2">
              Contact us <AiOutlineArrowRight />{" "}
            </button>
          </div>
          <div className="flex gap-y-2 w-72 flex-col border   rounded-lg p-2 items-center justify-center ">
            <h1 className="font-bold text-lg ">Phone Contact</h1>
            <p>900573.....</p>
            <button className="flex border hover:border-black  rounded-lg p-2 items-center justify-center gap-x-2">
              Contact us <AiOutlineArrowRight />{" "}
            </button>
          </div>
          <div className="flex gap-y-2 w-72 flex-col border   rounded-lg p-2 items-center justify-center ">
            <h1 className="font-bold text-lg ">Chatbot</h1>
            <p>Ecentricindia@gmail.com</p>
            <button className="flex border hover:border-black  rounded-lg p-2 items-center justify-center gap-x-2">
              Redirect <AiOutlineArrowRight />{" "}
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center ">
          <form ref={form} onSubmit={sendEmail}>
            <div className=" py-2 lg:px-28 ">
              <div className="md:flex  gap-x-4 items-center mt-12">
                <div className="md:w-full">
                  <label htmlFor="title" className=" sm:text-sm text-xs">
                    Name
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className=" bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full pl-10 p-2.5  "
                    />
                  </div>
                </div>
                <div className=" md:w-full">
                  <label htmlFor="title" className=" sm:text-sm text-xs">
                    Email
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className=" bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full pl-10 p-2.5   "
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex gap-x-4 items-center mt-2">
                <div className=" md:w-full">
                  <label htmlFor="title" className=" sm:text-sm text-xs">
                    Contact Details
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className="bg-[#F2F2F2] h-10 border border-gray-300 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full pl-10 p-2.5"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label htmlFor="description" className=" sm:text-sm text-xs">
                    Description
                  </label>
                  <div className="">
                    <textarea
                      id="description"
                      rows={6}
                      className="bg-[#F2F2F2]  border border-gray-300 h-40 text-black text-sm rounded-lg focus:ring-black/40 focus:border-black  w-full pl-10 p-2.5 "
                      defaultValue={""}
                    />
                  </div>
                  <p className="  text-gray-500 text-xs">
                    Write a few sentences about your roblem
                  </p>
                </div>
              </div>
              <p className="text-xs leading-3 text-gray-600 mt-4">
                By clicking submit you agree to our terms of service, privacy
                policy and how we use data as stated
              </p>
              <div className="flex items-start justify-start w-full">
                <button className="mt-9 w-full text-base font-semibold leading-none text-white py-4 px-10 bg-black rounded hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-black  focus:outline-none">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
