import React from "react";
import Filter from "../features/navbar/Filter";
import ProductList from "../features/product/components/ProductList";
import { useState } from "react";
import Footer from "../features/common/Footer";
const Filters = () => {
  const [searchData, setSearchData] = useState("");
  const handleSearch = (search) => {
    setSearchData(search);
  };
  return (
    <>
      <Filter handleSearch={handleSearch} />
      <ProductList searchData={searchData} />
      <Footer />
    </>
  );
};

export default Filters;
