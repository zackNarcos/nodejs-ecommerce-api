const router = require('express').Router();
const cateController = require('../controllers/cateController')
//const { verifyUser, verifyAdmin } = require("../middleware/verifyToken"); //new import

router.post('/', cateController.createCategory);

router.get('/show', cateController.getCategories);

router.delete('/:id', cateController.deleteCategory);

module.exports = router;