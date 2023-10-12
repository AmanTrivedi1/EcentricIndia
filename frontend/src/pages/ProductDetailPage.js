import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/common/Footer";
import NewNavbar from "../features/navbar/NewNavbar";
function ProductDetailPage() {
  return (
    <div>
      <NewNavbar />
      <ProductDetail />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
