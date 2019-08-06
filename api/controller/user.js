const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSignup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      response = {
        statusCode: 400,
        message: "Failed!",
        data: {
          error: "Bad Request. Missing fields."
        }
      };

      res.status(400).json(response);
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      response = {
        statusCode: 409,
        message: "Failed!",
        data: {
          error: "User already exists!"
        }
      };

      res.status(409).json(response);
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    delete savedUser._doc.__v;
    delete savedUser._doc.password;

    response = {
      statusCode: 201,
      message: "Succeed!",
      data: {
        user: {
          ...savedUser._doc
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

const userLogin = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      response = {
        statusCode: 400,
        message: "Failed!",
        data: {
          error: "Bad Request. Missing fields."
        }
      };

      return res.status(400).json(response);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      response = {
        statusCode: 401,
        message: "Failed!",
        data: {
          error: "Invalid credentials"
        }
      };

      return res.status(401).json(response);
    }

    const isEqual = bcrypt.compareSync(req.body.password, user.password);

    if (!isEqual) {
      response = {
        statusCode: 401,
        message: "Failed!",
        data: {
          error: "Invalid credentials"
        }
      };

      return res.status(401).json(response);
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    response = {
      statusCode: 200,
      message: "Succeed!",
      data: {
        token,
        tokenExpiration: 1
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

module.exports = {
  userSignup,
  userLogin
};
