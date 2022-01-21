import mongoose from 'mongoose';

const singleOrderItemSchema = mongoose.Schema({
    name: {type: 'String', required: true},
    image: {type: 'String'},
    price: {type: 'Number'},
    amount: {type: 'Number'},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },

})

const orderSchema = new mongoose.Schema(
  {
    orderItems: [singleOrderItemSchema],
    status: {
      type: String,
      enum: ['Pending', 'Failed', 'Delievered', 'Canceled'],
      default: 'Pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  },
  { timestamps: true },
);


const orderModal = mongoose.model('Orders', orderSchema)

export default orderModal