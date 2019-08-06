const Order = require("../models/order");
const Product = require("../models/product");

let response;

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .select("_id product quantity")
      .populate("product", "_id name price");
    response = {
      statusCode: 200,
      message: "Succeed!",
      data: {
        orders: orders.map(order => {
          // delete order._doc.product._doc.__v;
          return {
            ...order._doc,
            url: `http://localhost:${process.env.PORT || 3000}/orders/${
              order._id
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

const postOrder = async (req, res, next) => {
  try {
    if (!req.body.productId) {
      response = {
        statusCode: 400,
        message: "Failed!",
        data: {
          error: "Bad Request. Missing fields."
        }
      };

      return res.status(400).json(response);
    }

    const product = await Product.findById(req.body.productId);
    if (!product) {
      response = {
        statusCode: 400,
        message: "Failed!",
        data: {
          error: "Product not found!"
        }
      };

      return res.status(400).json(response);
    }

    const order = new Order({
      quantity: req.body.quantity,
      product: req.body.productId
    });

    const savedOrder = await order.save();
    delete savedOrder._doc.__v;

    response = {
      statusCode: 201,
      message: "Succeed!",
      data: {
        order: {
          ...savedOrder._doc,
          url: `http://localhost:${process.env.PORT || 3000}/orders/${
            savedOrder.id
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

const getOneOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id)
      .select("_id quantity product")
      .populate("product", "_id name price");

    if (order) {
      response = {
        statusCode: 200,
        message: "Succeed!",
        data: {
          order: {
            ...order._doc,
            url: `http://localhost:${process.env.PORT || 3000}/orders/${
              order._id
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
          error: `Order with id: ${id} not found!`
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

const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (order) {
      delete order._doc.__v;
      await Order.deleteOne({ _id: id });
      response = {
        statusCode: 200,
        message: "Succeed!",
        data: {
          order: {
            ...order._doc,
            url: null
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
  getAllOrders,
  postOrder,
  getOneOrder,
  deleteOrder
};
