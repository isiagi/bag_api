import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided']
    },
    description: {
        type: String,
        required: [true, 'Description must be provided']
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: false,
        default: 0
    },
    category: {
        type: String,
        enum: ['shoulder bags', 'wallet'],
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    image: {
        type: String,
    }
})

const productModal = mongoose.model('Product', productSchema)

export default productModal