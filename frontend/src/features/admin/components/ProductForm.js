import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { useAlert } from "react-alert";
import { computeHeadingLevel } from "@testing-library/react";

function ProductForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const alert = useAlert();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("USDprice", selectedProduct.USDprice);
      setValue("inrDiscount", selectedProduct.discountPercentage[0]);
      setValue("usdDiscount", selectedProduct.discountPercentage[1]);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("highlight1", selectedProduct.highlights[0]);
      setValue("highlight2", selectedProduct.highlights[1]);
      setValue("highlight3", selectedProduct.highlights[2]);
      setValue("highlight4", selectedProduct.highlights[3]);
      setValue("size", selectedProduct.size);
      setValue("color", selectedProduct.color);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <div className="flex px-4 lg:px-0 sm:mt-14 mt-10 md:flex-row md:items-start items-center gap-x-10  w-full md:w-full flex-col justify-center   m-auto ">
        <div className="   ">
          <div className="border hidden md:block p-2 rounded-lg">
            <h1 className="text-xl font-semibold">Admin Route</h1>
            <p>This is Admin Route only accesble to admin</p>
          </div>
        </div>
        <div>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log("formdata", data);
              const product = { ...data };
              product.images = [
                product.image1,
                product.image2,
                product.image3,
                product.thumbnail,
              ];
              product.highlights = [
                product.highlight1,
                product.highlight2,
                product.highlight3,
                product.highlight4,
              ];
              product.discountPercentage = [
                product.inrDiscount,
                product.usdDiscount,
              ];
              product.rating = 0;
              delete product["image1"];
              delete product["image2"];
              delete product["image3"];
              product.price = +product.price;
              product.USDprice = +product.USDprice;
              product.stock = +product.stock;
              // product.discountPercentage = +product.discountPercentage;
              // console.log("update hua kya", product);
              if (params.id) {
                product.id = params.id;
                product.rating = selectedProduct.rating || 0;
                dispatch(updateProductAsync(product));
                // console.log("Product update", product);
                alert.success("Product Updated");
                reset();
                navigate("/");
              } else {
                dispatch(createProductAsync(product));
                console.log("Product new", product);
                alert.success("Product Created");
                reset();
                navigate("/");
              }
            })}
          >
            <div className=" ">
              <div className="border-b border-gray-900/10">
                <div className=" grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-8">
                  {selectedProduct && selectedProduct.deleted && (
                    <h2 className="text-red-500 sm:col-span-6">
                      This product is deleted
                    </h2>
                  )}
                  <div className="sm:col-span-8 col-span-full w-full">
                    <label
                      htmlFor="title"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Product Name
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus:shadow-lg focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("title", {
                          required: "name is required",
                        })}
                        id="title"
                        className="block flex-1 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="">
                      <textarea
                        id="description"
                        {...register("description", {
                          required: "description is required",
                        })}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black/40 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className=" sm:text-sm text-xs leading-6 text-gray-600">
                      Write a few sentences about product.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="brand"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Brand
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("brand", {
                          required: "brand is required",
                        })}
                        id="brand"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="color"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Color
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("color", {
                          required: "color is required",
                        })}
                        id="color"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="size"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Size (with unit)
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("size", {
                          required: "brand is required",
                        })}
                        id="size"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="category"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("category", {
                          required: "category is required",
                        })}
                        id="category"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="price"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Price in &#8377;
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="number"
                        {...register("price", {
                          required: "price is required",
                          // min: 1,
                          // max: 10000,
                        })}
                        id="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="USDprice"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Price in $
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="number"
                        {...register("USDprice", {
                          required: "USDprice is required",
                          // min: 1,
                          // max: 10000,
                        })}
                        id="USDprice"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="inrDiscount"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Discount Percentage for &#8377;
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="number"
                        {...register("inrDiscount", {
                          required: "inrDiscount is required",
                          min: 0,
                          max: 100,
                        })}
                        id="inrDiscount"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="usdDiscount"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Discount Percentage for $
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="number"
                        {...register("usdDiscount", {
                          required: "usdDiscount is required",
                          min: 0,
                          max: 100,
                        })}
                        id="usdDiscount"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="stock"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Stock
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="number"
                        {...register("stock", {
                          required: "stock is required",
                          min: 0,
                        })}
                        id="stock"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="thumbnail"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Thumbnail
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40">
                      <input
                        type="text"
                        {...register("thumbnail", {
                          required: "thumbnail is required",
                        })}
                        id="thumbnail"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="image1"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Image 1
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("image1", {
                          required: "image1 is required",
                        })}
                        id="image1"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="image2"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Image 2
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("image2", {
                          required: "image is required",
                        })}
                        id="image2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="image2"
                      className="block sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Image 3
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("image3", {
                          required: "image is required",
                        })}
                        id="image3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="highlight1"
                      className="block  sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Highlight 1
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("highlight1", {})}
                        id="highlight1"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="highlight2"
                      className="block  sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Highlight 2
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/400 ">
                      <input
                        type="text"
                        {...register("highlight2", {})}
                        id="highlight2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="highlight3"
                      className="block  sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Highlight 3
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("highlight3", {})}
                        id="highlight3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="highlight4"
                      className="block  sm:text-sm text-xs font-medium leading-6 text-gray-900"
                    >
                      Highlight 4
                    </label>

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black/40 ">
                      <input
                        type="text"
                        {...register("highlight4", {})}
                        id="highlight4"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="rounded-md w-full bg-red-500 px-3 opacity-100 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red/40"
              >
                Cancel
              </button>

              {selectedProduct && !selectedProduct.deleted && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal(true);
                  }}
                  className="rounded-md w-full bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  opacity-100 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                >
                  Delete
                </button>
              )}

              <button
                type="submit"
                className="rounded-md w-full bg-black px-3 opacity-100 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  );
}

export default ProductForm;
