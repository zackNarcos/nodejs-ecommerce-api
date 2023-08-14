const Category = require("../models/cateModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createCategory = async (req, res, next) => {
  const dbCategory = await Category.findOne({ name: req.body.category.name });
  if (dbCategory) return res.status(400).send("La categorie existe déjà");

  const newCategory = new Category({ name: req.body.category.name });

  newCategory.save((error, category) => {
    if (error) return res.status(400).send("an error occurred", error);
    return res.status(200).send({ message: "category created", category });
  });
};

exports.getCategories = (req, res, next) => {
  Category.find({}, "name createdAt _id",(error, categories) => {
    if (error) return res.status(400).send("an error occurred", error);
    return res.status(200).send({ message: "showing category list", count: categories.length, categories, });
  });
};

exports.deleteCategory = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id, (error, category) => {
    if (error) return res.status(400).send("une erreur est survenue", error);
    return res.status(200).send({ message: "categorie supprimée", category });
  });
}

