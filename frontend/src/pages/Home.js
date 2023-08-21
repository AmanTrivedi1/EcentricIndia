import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import { useState } from "react";

function Home() {
  const [searchData, setSearchData] = useState("");

  const handleSearch = (search) => {
    setSearchData(search);
  };

  return (
    <div>
      <NavBar handleSearch={handleSearch} />
      <ProductList searchData={searchData} />
      <Footer />
    </div>
  );
}

export default Home;
