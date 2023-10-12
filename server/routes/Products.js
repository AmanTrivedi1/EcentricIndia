const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  fetchProductsByCategory,
  createProductReview,
  getProductReviews,
  deleteReviews,
  editProductReview
} = require("../controller/Product");
const { Product } = require("../model/Product");

const router = express.Router();
//  products is already added in base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/category/", fetchProductsByCategory)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .put("/review", createProductReview)
  .put("/review/edit", editProductReview)
  .get("/review/:prodId", getProductReviews)
  .delete("/review/:prodId/:reviewId", deleteReviews);
exports.router = router;
