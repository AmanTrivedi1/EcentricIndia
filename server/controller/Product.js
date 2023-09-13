const { Product } = require("../model/Product");
const { Brand } = require("../model/Brand");
const { Category } = require("../model/Category");
const CC = require('currency-converter-lt')

exports.createProduct = async (req, res) => {
  let currencyConverter = new CC({from:"INR", to:"USD"});
  const product = new Product(req.body);
  const USDprice = await currencyConverter.convert(req.body.price).then((response) => {
    return response;
  })
  
  product.USDprice = USDprice;
  const brandCheck = await Brand.find({ value: req.body.brand }).exec();
  const categoryCheck = await Category.find({
    value: req.body.category,
  }).exec();
  let brand, category;
  if (brandCheck.length === 0) {
    brand = new Brand({ label: req.body.brand, value: req.body.brand });
    await brand.save();
  }
  if (categoryCheck.length === 0) {
    category = new Category({
      label: req.body.category,
      value: req.body.category,
    });
    await category.save();
  }
  product.discountPrice.push(
    Math.round(product.price * (1 - product.discountPercentage / 100))
  );
  product.discountPrice.push(
    product.USDprice * (1 - product.discountPercentage / 100).toFixed(2)
  );
  console.log("kjk",product)
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log("sfs",err)
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  console.log("query", req.query.search);
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.search) {
    query = query.find({ title: new RegExp(req.query.search, "i") });
    totalProductsQuery = totalProductsQuery.find({
      title: new RegExp(req.query.search, "i"),
    });
  }

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductsByCategory = async (req, res) => {
  console.log("nolmkl", req.query);
  try {
    const product = await Product.find({
      $and: [{ category: req.query.category }, { _id: { $ne: req.query.id } }],
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let currencyConverter = new CC({from:"INR", to:"USD"});
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log('adf',product)
    const brandCheck = await Brand.find({ value: req.body.brand }).exec();
    const categoryCheck = await Category.find({
      value: req.body.category,
    }).exec();
    let brand, category;
    const USDprice = await currencyConverter.convert(req.body.price).then((response) => {
      return response;
    })    
    product.USDprice = USDprice;
    if (brandCheck.length === 0) {
      brand = new Brand({ label: req.body.brand, value: req.body.brand });
      await brand.save();
    }
    if (categoryCheck.length === 0) {
      category = new Category({
        label: req.body.category,
        value: req.body.category,
      });
      await category.save();
    }
    product.discountPrice = [];
    product.discountPrice.push(
      Math.round(product.price * (1 - product.discountPercentage / 100))
      );
      product.discountPrice.push(
        product.USDprice * (1 - product.discountPercentage / 100).toFixed(2)
        );
        const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
};

// Create New Reviews or update the reviews

exports.createProductReview = async (req, res) => {
  const { rating, comment, productId, userId } = req.body;
  const review = {
    user: userId,
    name: "Name",
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};
// This will get all the reviews
exports.getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new Error("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};
//  Access to delete the reviews
exports.deleteReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new Error("Product not found", 404));
  }
  // Ye Filter Karega jo delete nhi karne h
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};
