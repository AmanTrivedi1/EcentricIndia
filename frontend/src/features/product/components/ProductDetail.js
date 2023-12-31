import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Star from "../../../components/Star";
import ReadMoreReact from "read-more-react";
import { useCurrency } from "../../../context/CurrencyContext";

import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectAllComments,
  selectProductListStatus,
  fetchProductByCategoryAsync,
  selectProductByCategory,
  createCommentAsync,
  fetchCommentsAsync,
  deleteCommentByIdAsync,
  editCommentAsync,
  allCommentsRatings,
  allCommentsNumber,
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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [editedCommentRating, setEditedCommentRating] = useState("");

  const [comment, setComment] = useState("");
  const [commentRating, setCommentRating] = useState(1);
  const user = useSelector(selectLoggedInUser);
  console.log("user", user);
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const similarCategory = useSelector(selectProductByCategory);
  const allComments = useSelector(selectAllComments);
  const totalRating = useSelector(allCommentsRatings);
  const numberofReviews = useSelector(allCommentsNumber);

  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const minimumLength = 80;
  const idealLength = 100;
  const maxLength = 200;
  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
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

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product) {
      const category = product?.category;
      const id = product?.id;
      dispatch(fetchCommentsAsync(product.id));
      dispatch(fetchProductByCategoryAsync({ category, id }));
    }
  }, [dispatch, product]);

  const CommentDeleteHandler = async (reviewId) => {
    dispatch(
      deleteCommentByIdAsync({ prodId: product.id, reviewId: reviewId })
    );
  };

  const startEditing = (reviews) => {
    setEditingCommentId(reviews._id);
    setEditedCommentText(reviews.comment);
    setEditedCommentRating(reviews.rating);
  };

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    return `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
  };

  return (
    <>
      {status === "loading" ? <Product /> : null}
      {product && (
        <div className="flex bg-accent pb-8 lg:flex-row flex-col px-4 items-start    md:mt-5 gap-x-10 justify-center">
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
              <h1 className="  mt-10 lg:mt-5  text-2xl md:text-3xl font-bold ">
                {product.title}
              </h1>
              <p className="text-sm items-center flex gap-x-2">
                {" "}
                <span>Category</span>({product.category})
              </p>
              <div className="mt-2">
                <p className="  mt-2 lg:mt-0 sm:text-base text-sm text-[#87898B]  ">
                  Category:
                  <span className="text-black/80 ml-2">{product.brand} </span>
                </p>
              </div>
              <div className="mt-2">
                <p className="  mt-2 lg:mt-0 sm:text-base text-sm text-[#87898B]  ">
                  Size/Quantity:
                  <span className="text-black/80 ml-2">{product.size} </span>
                </p>
              </div>

              <div className="mt-2">
                <p className="  mt-2 lg:mt-0 sm:text-base text-sm text-[#87898B]  ">
                  Stocks
                  <span className="text-black/80 ml-2">{product.stock} </span>
                </p>
              </div>
              <div className="mt-2">
                <Star reviews={product?.ratings} />
              </div>
              <div className="mt-10">
                {selectedCurrency === "inr" ? (
                  <div className="flex gap-x-4 mt-2">
                    <p className="sm:text-base text-sm">
                      &#8377; {product.discountPrice[0]}
                    </p>
                    <p className="line-through sm:text-base text-sm text-gray-400">
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
                    className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {similarCategory.length > 0 ? (
        <>
          <h1 className="text-3xl bg-accent  h-full font-semibold text-center">
            You might also like
          </h1>
        </>
      ) : null}

      <div className="py-10 bg-accent mb-10 ">
        <div className="mx-auto max-w-2xl px-4 py-0  sm:py-0 lg:max-w-7xl ">
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
                  <div className=" m-10 flex justify-between">
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
                        <Star reviews={product?.ratings} />
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
        <div className="mx-auto   m-auto left-0 right-0 top-0 bottom-0 max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className=" sm:col-span-8 col-span-full md:w-80 mt-20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  createCommentAsync({
                    userId: user?.id,
                    name: user?.name,
                    productId: product?.id,
                    comment: e.target[0].value,
                    rating: e.target[1].value,
                  })
                );
                setComment("");
                setCommentRating("");
              }}
            >
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
              />
              <input
                className="block w-full mt-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                type="number"
                placeholder="Rate out of 5 in Numbers"
                min={1}
                max={5}
                value={commentRating}
                onChange={(e) => {
                  setCommentRating(e.target.value);
                }}
              />

              {user && (
                <button
                  className="rounded-md mb-10 w-full mt-5 bg-black px-3 opacity-100 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                  type="submit"
                >
                  Submit
                </button>
              )}
              {!user && (
                <Link to="/login">
                  <p className="rounded-md mb-10 w-full mt-5 text-center bg-black px-3 opacity-100 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40">
                    Login to Review
                  </p>
                </Link>
              )}
            </form>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className=" flex md:text-base cursor-pointer sm:text-sm text-xs flex-col   gap-y-2 ">
            <div className="mb-20">
              <h1 className="text-xl  font-semibold">Product Reviews</h1>
              <div className="flex items-center justify-start gap-x-2">
                <p>{numberofReviews}</p>
                <p className="text-xs ml-1">(Total Reviews)</p>
              </div>

              <div className="flex items-center justify-start gap-x-2">
                <Star reviews={product?.ratings} />
                <p className="text-xs ml-1">(Average Rating)</p>
              </div>
            </div>

            <div className="flex flex-col">
              {allComments?.map((reviews) => (
                <div
                  key={reviews._id}
                  className={
                    user?.id === reviews?.user ? "-order-1" : "order-none"
                  }
                >
                  {user?.id === reviews?.user && <h1 className=""></h1>}
                  {editingCommentId === reviews._id ? (
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          dispatch(
                            editCommentAsync({
                              userId: user?.id,
                              name: user?.name,
                              productId: product?.id,
                              comment: e.target[0].value,
                              rating: e.target[1].value,
                            })
                          );
                          setEditingCommentId(null);
                          setEditedCommentText("");
                          setEditedCommentRating("");
                        }}
                      >
                        <textarea
                          value={editedCommentText}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                          onChange={(e) => setEditedCommentText(e.target.value)}
                        />
                        <input
                          type="number"
                          className="block w-full mt-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                          min={1}
                          max={5}
                          value={editedCommentRating}
                          onChange={(e) =>
                            setEditedCommentRating(e.target.value)
                          }
                        />
                        <div className="flex gap-x-2 mt-4 mb-4">
                          <button className="btn " type="submit">
                            Save
                          </button>
                          <button
                            className="btn bg-red-500 hover:bg-red-600"
                            onClick={() => setEditingCommentId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div
                      className={
                        user?.id === reviews?.user ? "-order-1" : "order-none"
                      }
                    >
                      <ReadMoreReact
                        text={reviews.comment}
                        min={minimumLength}
                        ideal={idealLength}
                        max={maxLength}
                      />
                      <Star reviews={reviews.rating}></Star>
                      <p className="text-xs text-gray-600">{reviews.name}</p>
                      <p className="text-xs">{formatDate(reviews.createdAt)}</p>
                      {/* <p>{formatDate(reviews.updatedAt)}</p> */}
                      <div className="flex gap-x-4 mt-4 mb-4 ">
                        {user?.role === "admin" && (
                          <button
                            className="btn bg-red-500 hover:bg-red-600"
                            onClick={() => {
                              CommentDeleteHandler(reviews._id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                        {user?.id === reviews?.user && (
                          <button
                            className="btn border border-primary hover:bgorder-black text-primary bg-transparent"
                            onClick={() => startEditing(reviews)}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
