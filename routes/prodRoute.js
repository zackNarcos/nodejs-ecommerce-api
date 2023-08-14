const express = require("express");
const { date } = require("joi");
const router = express.Router();
const multer = require("multer");
const ProdController = require("../controllers/prodController");
//const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");
const fs = require('fs');
const uploadDir = './public/uploads/';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"  || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("productImage"), ProdController.createProduct);

router.get("/show", ProdController.getProducts);

router.put("/:id", ProdController.updateProduct);

router.delete("/:id", ProdController.deleteProduct);

module.exports = router;
