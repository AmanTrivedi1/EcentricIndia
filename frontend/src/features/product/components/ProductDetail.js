import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useCurrency } from "../../../context/CurrencyContext";
import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
  fetchProductByCategoryAsync,
  selectProductByCategory,
} from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useAlert } from "react-alert";
import Product from "../../../components/Product";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { selectedCurrency } = useCurrency();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const similarCategory = useSelector(selectProductByCategory);
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param ", product);
  console.log(similarCategory, "line12");
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({ item: newItem, alert }));
    } else {
      alert.error("Item Already added");
    }
  };

  console.log("sjdkbfjadmqorvj ejve jvetj rvk vrtgor,", similarCategory);
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product) {
      console.log("mpommomom", product);
      const category = product?.category;
      const id = product?.id;
      dispatch(fetchProductByCategoryAsync({ category, id }));
    }
  }, [dispatch, product]);
  const cd = product;
  console.log(cd);

  return (
    <>
      {status === "loading" ? <Product /> : null}
      {product && (
        <div className="flex pb-8 lg:flex-row flex-col px-4 items-start  mt-20 gap-x-10 justify-center">
          <div className=" ">
            <nav aria-label="Breadcrumb">
              <ol className="">
                {product.breadcrumbs &&
                  product.breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <a
                          href={breadcrumb.href}
                          className="mr-2 text-sm font-medium text-gray-900"
                        >
                          {breadcrumb.name}
                        </a>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                <li className="text-sm">
                  <a
                    href={product.href}
                    aria-current="page"
                    className="font-medium text-xs  text-gray/10"
                  >
                    <p className="w-20 truncate"> {product.title}</p>
                  </a>
                </li>
              </ol>
            </nav>

            <div className=" max-w-3xl">
              <div className="max-w-2xl ">
                <Carousel
                  infiniteLoop={true}
                  showIndicators={false}
                  showStatus={false}
                  thumbWidth={60}
                  className="productCarousel"
                >
                  <img src={product.images[0]} alt="ProductImage" />
                  <img src={product.images[1]} alt="ProductImage" />
                  <img src={product.images[2]} alt="ProductImage" />
                  <img src={product.images[3]} alt="ProductImage" />
                </Carousel>
              </div>
              <div className="mt-4">
                <div>
                  <h3 className="  text-[#87898B] sm:text-xl text-lg font-bold">
                    Description
                  </h3>

                  <div className="mt-1 sm:text-sm text-xs">
                    <p className="">{product.description}</p>
                  </div>
                </div>
                {product.highlights && (
                  <div className="">
                    <h3 className=" mt-4 text-[#87898B] sm:text-xl text-lg font-bold">
                      Highlights
                    </h3>
                    <div className="sm:text-sm text-xs ">
                      <ul className="">
                        {product.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-gray-400 list-disc ml-4 mt-1"
                          >
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" rightside  lg:w-96  w-full  ">
            <div className="">
              <h2 className="sr-only">Product information</h2>
              <h1 className=" md:text-3xl mt-4 lg:mt-0 text-2xl font-bold ">
                {product.title}
              </h1>
              {selectedCurrency === "inr" ? (
                <div className="flex gap-x-4 mt-2">
                  <p className="text-xl">&#8377; {product.discountPrice[0]}</p>
                  <p className="line-through text-xl text-gray-400">
                    &#8377; {product.price}
                  </p>
                </div>
              ) : (
                <div className="flex gap-x-4 mt-2">
                  <p className="text-xl">$ {product.discountPrice[1]}</p>
                  <p className="line-through text-xl text-gray-400">
                    $ {product.USDprice}
                  </p>
                </div>
              )}

              <div className="">
                <h3 className="sr-only">Reviews</h3>
                <div className=" flex font-xl ">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className=" sr-only">{product.rating} out of 5 stars</p>
                <div
                  className="mt-2"
                  style={{
                    backgroundColor: `${product.color}`,
                    width: "30px",
                    height: "30px",
                  }}
                ></div>
              </div>

              <form className="mt-10">
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <div className="flex items-center space-x-3">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                              )
                            }
                          >
                            {/* <RadioGroup.Label as="span" className="">
                              {product.color}
                            </RadioGroup.Label> */}

                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "h-8 w-8 rounded-full border border-black border-opacity-10"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-10">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="">
                        Choose a size
                      </RadioGroup.Label>
                      <div className=" grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 ">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-black shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 " : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-black"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {user && (
                  <button
                    onClick={handleCart}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl   h-full font-semibold text-center">
        You might also like
      </h1>
      <div className="py-10 mb-10 ">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid  gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {status === "loading" ? <></> : null}
            {similarCategory?.map((product) => (
              <Link to={`/product-detail/${product.id}`} key={product.id}>
                <div className="group relative  p-2 ">
                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-90 lg:h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-black">
                        <div href={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          <p className="sm:w-20 md:w-30 w-10 truncate">
                            {" "}
                            {product.title}
                          </p>
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-700">
                        <StarIcon className="w-6 h-6 inline"></StarIcon>
                        <span className=" align-bottom">{product.rating}</span>
                      </p>
                    </div>
                    {selectedCurrency === "inr" ? (
                      <div>
                        <p className="text-sm block font-medium text-gray-900">
                          &#8377; {product.discountPrice[0]}
                        </p>
                        <p className="text-sm block line-through font-medium text-gray-400">
                          &#8377; {product.price}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm block font-medium text-gray-900">
                          ${product.discountPrice[1]}
                        </p>
                        <p className="text-sm block line-through font-medium text-gray-400">
                          ${product.USDprice}
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
                      <p className="text-sm text-red-400">out of stock</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
