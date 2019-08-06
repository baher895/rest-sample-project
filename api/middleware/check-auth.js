const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }

  let decoedToken;
  try {
    decoedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }

  if (!decoedToken) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }

  req.userData = decoedToken;

  next();
};
