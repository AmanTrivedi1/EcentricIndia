import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

import { AiOutlineStar } from "react-icons/ai";
const Star = ({ reviews }) => {
  const ratings = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {reviews >= index + 1 ? (
          <FaStar />
        ) : reviews >= number ? (
          <FaStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });

  return (
    <>
      <div className="flex items-center justify-start ">
        <p className="flex items-center  text-yellow-500 ">{ratings}</p>
      </div>
    </>
  );
};

export default Star;
