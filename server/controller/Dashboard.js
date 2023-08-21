const { Order } = require("../model/Order");
const { Product } = require("../model/Product");
const { User } = require("../model/User");

exports.fetchDashboardData = async (req, res) => {
  try {
    const ordersCount = await Order.count();
    const productsCount = await Product.count();
    const orderPrice = await Order.aggregate([
      {
        $group: {
          _id: null,
          // totalAmount: { $sum: { $multiply: ["$price", "$stock"] } },
          totalAmount: { $sum: "$totalAmount" },
          count: { $sum: "$totalItems" },
        },
      },
    ]);
    const orderPaymentStatus = await Order.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]);
    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const userCount = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      ordersCount: ordersCount,
      productsCount: productsCount,
      orderPrice: orderPrice,
      orderPaymentStatus: orderPaymentStatus,
      orderStatus: orderStatus,
      userCount: userCount,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
