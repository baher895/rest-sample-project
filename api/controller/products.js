const Product = require("../models/product");
const fs = require("fs");

let response;

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().select("_id name price productImage");
    response = {
      statusCode: 200,
      message: "Succeed!",
      data: {
        products: products.map(product => {
          return {
            ...product._doc,
            url: `http://localhost:${process.env.PORT || 3000}/products/${
              product._id
            }`,
            imageUrl: `http://localhost:${process.env.PORT || 3000}/${
              product._doc.productImage
            }`
          };
        })
      }
    };

    res.status(200).json(response);
  } catch (error) {
    response = {
      statusCode: 500,
      message: "Failed!",
      data: {
        error
      }
    };

    res.status(500).json(response);
  }
};

const postProduct = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      response = {
        statusCode: 400,
        message: "Failed!",
        data: {
          error: "Bad Request. Missing fields."
        }
      };

      res.status(400).json(response);
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    });

    const savedProduct = await product.save();
    delete savedProduct._doc.__v;

    response = {
      statusCode: 201,
      message: "Succeed!",
      data: {
        product: {
          ...savedProduct._doc,
          url: `http://localhost:${process.env.PORT || 3000}/products/${
            savedProduct.id
          }`,
          imageUrl: `http://localhost:${process.env.PORT || 3000}/${
            savedProduct._doc.productImage
          }`
        }
      }
    };

    res.status(201).json(response);
  } catch (error) {
    response = {
      statusCode: 500,
      message: "Failed!",
      data: {
        error
      }
    };

    res.status(500).json(response);
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).select(
      "_id name price productImage"
    );

    if (product) {
      response = {
        statusCode: 200,
        message: "Succeed!",
        data: {
          product: {
            ...product._doc,
            url: `http://localhost:${process.env.PORT || 3000}/products/${
              product._id
            }`,
            imageUrl: `http://localhost:${process.env.PORT || 3000}/${
              product._doc.productImage
            }`
          }
        }
      };

      res.status(200).json(response);
    } else {
      response = {
        statusCode: 404,
        message: "Failed!",
        data: {
          error: `Product with id: ${id} not found!`
        }
      };

      res.status(404).json(response);
    }
  } catch (error) {
    response = {
      statusCode: 500,
      message: "Failed!",
      data: {
        error
      }
    };

    res.status(500).json(response);
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      const updateObj = {};
      for (const field in req.body) {
        if (Product.schema.paths[field]) {
          updateObj[field] = req.body[field];
        }
      }

      await Product.update({ _id: id }, { $set: updateObj });

      response = {
        statusCode: 200,
        message: "Succeed!",
        data: {
          updated: {
            ...updateObj,
            url: `http://localhost:${process.env.PORT || 3000}/products/${
              product.id
            }`,
            imageUrl: `http://localhost:${process.env.PORT || 3000}/${
              product._doc.productImage
            }`
          }
        }
      };

      res.status(200).json(response);
    } else {
      response = {
        statusCode: 404,
        message: "Failed!",
        data: {
          error: `Product with id: ${id} not found!`
        }
      };

      res.status(404).json(response);
    }
  } catch (error) {
    response = {
      statusCode: 500,
      message: "Failed!",
      data: {
        error
      }
    };

    res.status(500).json(response);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      delete product._doc.__v;
      await Product.deleteOne({ _id: id });
      fs.unlinkSync(product._doc.productImage);
      response = {
        statusCode: 200,
        message: "Succeed!",
        data: {
          product: {
            ...product._doc,
            url: null,
            imageUrl: null
          }
        }
      };

      res.status(200).json(response);
    } else {
      response = {
        statusCode: 404,
        message: "Failed!",
        data: {
          error: `Product with id: ${id} not found!`
        }
      };

      res.status(404).json(response);
    }
  } catch (error) {
    response = {
      statusCode: 500,
      message: "Failed!",
      data: {
        error
      }
    };

    res.status(500).json(response);
  }
};

module.exports = {
  getAllProducts,
  postProduct,
  getOneProduct,
  patchProduct,
  deleteProduct
};
