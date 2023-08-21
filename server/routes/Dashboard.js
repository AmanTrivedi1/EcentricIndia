const express = require("express");
const { fetchDashboardData } = require("../controller/Dashboard");

const router = express.Router();
//  /products is already added in base path
router.get("/", fetchDashboardData);

exports.router = router;
