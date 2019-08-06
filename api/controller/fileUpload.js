const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./productImage/");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File Type Error. You only can save jpeg & png."), false);
  }
};

module.exports = multer({
  storage,
  limit: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter
});
