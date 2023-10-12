import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={` w-full max-w-11/12 px-5 md:px-10 mx-auto ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
