import express from "express";
import {getAllProduct, getOneProduct, createProduct ,updateProduct, deleteProduct} from '../controllers/productController.js'

const router = express.Router();

router.route('/product').get(getAllProduct).post(createProduct)
router.route('/:id').get(getOneProduct).delete(deleteProduct).patch(updateProduct)


export default router;