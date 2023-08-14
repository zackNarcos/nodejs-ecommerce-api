const Product = require("../models/prodModel");
const fs = require('fs');
const filePath = "./public/uploads/";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
exports.createProduct = async (req, res, next) => {

  try {
    const newProduct = {
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      productImage: req.file.filename,
      quantity: req.body.quantity,
    };

    const product = await Product.create(newProduct);
    return res.status(200).send({ message: "Produit créé avec succès", product });
  } catch (error) {
    if (error.code === 11000) return res.status(200).send({ message: "le produit existe déjà" });
    return res.status(400).send({ message: "Erreur lors de la création du produit", error });
  }
};

exports.updateProduct = async (req, res, next) => {
  const filter = { _id: req.body._id };
  await Product.findByIdAndUpdate(filter, update);
}

exports.deleteProduct = async (req, res, next) => {
  const filter = { _id: req.params.id };
  //remove image from uploads folder
  const product = await Product.findById(filter._id);
  if (product) {
    // fs.unlink(filePath + product.productImage, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
  }
  //delete product from db
  await Product.findByIdAndDelete(filter);
  return res.status(200).send({ message: "Produit supprimé avec succès" });
}


exports.getProducts = (req, res, next) => {

  const pageNo = parseInt(req.query.pageNo);
  const size = 3;
 
  if (pageNo <= 0 ) {
    return res.status(200).send({ error: true, message: "invalid page number" });
  }

  const query = {
    //skip = size * (pageNo - 1),
    //limit = size,
  };

  Product.find({}, {}, query)
    .populate("category", "name")
    .exec((error, products) => {
        if (error) return res.status(400).send("an error occurred", error);
        return res.status(200).send({ message: "showing product list", count: products.length, products, });
    });
};