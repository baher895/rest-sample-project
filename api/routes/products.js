const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const upload = require("../controller/fileUpload");
const {
  getAllProducts,
  postProduct,
  getOneProduct,
  patchProduct,
  deleteProduct
} = require("../controller/products");

router.get("/", getAllProducts);

router.post("/", checkAuth, upload.single("productImage"), postProduct);

router.get("/:id", getOneProduct);

router.patch("/:id", checkAuth, patchProduct);

router.delete("/:id", checkAuth, deleteProduct);

module.exports = router;
