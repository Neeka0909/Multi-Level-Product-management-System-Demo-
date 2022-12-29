const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: String, required: false },
    productDescription: { type: String, required: false },
    productImage: { type: String, required: false }
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product