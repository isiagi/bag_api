import mongoose  from "mongoose";
import productModal from "./models/productModal.js";
import jsonProduct from './product.js'

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mybag')
        await productModal.deleteMany()
        await productModal.create(jsonProduct)
        console.log('success!!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

connect()