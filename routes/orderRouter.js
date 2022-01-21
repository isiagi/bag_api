import express from  'express';
import {getOrder, getOrderById, createOrder, updateOrder, deleteOrder} from '../controllers/orderController.js'

const router = express.Router();

router.route('/order').get(getOrder).post(createOrder)
router.route('/:id').get(getOrderById).patch(updateOrder).delete(deleteOrder)

export default router