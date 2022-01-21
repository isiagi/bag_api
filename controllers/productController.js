import productModal from '../models/productModal.js';
import { StatusCodes } from 'http-status-codes';
import { cloudinary } from '../utils/cloudinary.js';

const getAllProduct = async (req, res) => {
  console.log(req.user);
  const products = await productModal.find();
  res.status(StatusCodes.OK).json({ message: products });
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModal.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ message: product });
};

const createProduct = async (req, res) => {
  const file = req.files.image;

  try {
    const load = await cloudinary.uploader.upload(file.tempFilePath, {
      upload_preset: 'spjtzbec',
    });
    req.body.image = load.secure_url;
    const newItem = await productModal.create(req.body);
    res.status(200).json({ message: newItem });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModal.findOne({ _id: id });
  const productz = await productModal.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: `${product.name} has successfully updated`, productz });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModal.findOne({ _id: id });
  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: ' Product Not Found' });
  }
  await productModal.deleteOne({ _id: product });
  res
    .status(200)
    .json({ message: `${product.name} has been successful deleted` });
};

export {
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
