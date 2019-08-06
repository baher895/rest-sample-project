const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/productImage", express.static("productImage"));

app.get("/health-check", (req, res, next) => {
  res.status(200).json({
    message: "Server is up & running"
  });
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const response = {
    statusCode: error.status || 500,
    message: "Failed!",
    data: {
      error: error.message || `Something horrible happend! Call someone ASAP!!!`
    }
  };

  res.status(error.status || 500).json(response);
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-y9ecc.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`The Server is Up & Running on Port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
