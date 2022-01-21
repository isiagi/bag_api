import Product from '../models/productModal.js';
import Order from '../models/orderModel.js';
import { StatusCodes } from 'http-status-codes';
import { checkPermission } from '../utils/checkPermission.js';

const getOrder = async (req, res) => {
  const orders = await Order.find();
  res.status(StatusCodes.OK).json({ orders });
};

const createOrder = async (req, res) => {
  const { items: cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    return res.status(400).json({ message: 'No items in cart' });
  }
  let orderItems = [];
  for (const item of cartItems) {
    const pd = await Product.findOne({ _id: item._id });

    if (!pd) {
      return res.status(400).json({ message: 'No items in cart with id' });
    }
    const { name, price, image, _id } = pd;
    const singleOrderItem = {
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
  }

  const order = await Order.create({
    orderItems,
    user: req.user.username,
  });
  res.status(StatusCodes.OK).json({ re: order });
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    return res.status(400).json({ message: 'No Order with that ID' });
  }

  checkPermission(res, req.user, order.user);

  res.status(StatusCodes.OK).json({ status: order });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if(!order){
    return res.status(StatusCodes.BAD).json({ status: "error occured" });
  }
  res.status(StatusCodes.OK).json({ status: order });
};

const currentUserOrder = async (req, res) => {
  const order = await Order.find({user: req.user.username})
  return res.status(200).json({message: order, count: order.length})
}

const deleteOrder = (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ status: id });
};

export { getOrder, createOrder, getOrderById, updateOrder, deleteOrder };
