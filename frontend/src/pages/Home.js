import Product from "../features/product/components/Product";
import Footer from "../features/common/Footer";
import { CrispProvider } from "./CrispProvider";
import NavBar from "../features/navbar/Navbar";
import Heropage from "../features/home/Heropage";
import NewNavbar from "../features/navbar/NewNavbar";
function Home() {
  return (
    <div>
      <NewNavbar />
      <Heropage />
      <Product />
      <CrispProvider />
      <Footer />
    </div>
  );
}

export default Home;
