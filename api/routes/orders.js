const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const {
  getAllOrders,
  postOrder,
  getOneOrder,
  deleteOrder
} = require("../controller/orders");

router.get("/", checkAuth, getAllOrders);

router.post("/", checkAuth, postOrder);

router.get("/:id", checkAuth, getOneOrder);

router.delete("/:id", checkAuth, deleteOrder);

module.exports = router;
