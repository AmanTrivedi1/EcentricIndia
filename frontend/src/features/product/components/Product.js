import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectProductListStatus,
  selectTotalItems,
} from "../productSlice";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useCurrency } from "../../../context/CurrencyContext";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";

export default function Product() {
  const { selectedCurrency } = useCurrency();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  const [page, setPage] = useState(1);

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ pagination }));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <div className="">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="  pb-6 pt-24">
            <h1 className="text-4xl font-bold text-center  ">All Products</h1>
          </div>

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="lg:col-span-4">
              <ProductGrid products={products} status={status}></ProductGrid>
            </div>
          </section>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}

function ProductGrid({ products, status }) {
  const { selectedCurrency } = useCurrency();
  return (
    <div className="min-h-[300px]">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {status === "loading" ? <Loader /> : null}
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="group relative  p-2 ">
                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none  lg:h-60">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full object-cover  w-full  object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.thumbnail}>
                        <span
                          aria-hidden="true"
                          className="absolute w-20 truncate inset-0"
                        />
                        <p className="w-20 truncate"> {product.title}</p>
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline"></StarIcon>
                      <span className=" align-bottom">{product.rating}</span>
                    </p>
                  </div>
                  {selectedCurrency === "inr" ? (
                    <div>
                      <p className="text-sm block font-medium text-gray-900">
                        &#8377;{product.discountPrice[0]}
                      </p>
                      <p className="text-sm block line-through font-medium text-gray-400">
                        &#8377;{product.price}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm block font-medium text-gray-900">
                        $ {product.discountPrice[1]}
                      </p>
                      <p className="text-sm block line-through font-medium text-gray-400">
                        $ {product.USDprice}
                      </p>
                    </div>
                  )}
                </div>
                {product.deleted && (
                  <div>
                    <p className="text-sm text-red-400">product deleted</p>
                  </div>
                )}
                {product.stock <= 0 && (
                  <div>
                    <p className="text-sm text-red-400 ">
                      <MdOutlineRemoveShoppingCart className="text-xl" />
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
