const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoryrSchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true,
})

const Category = mongoose.model('Category', categoryrSchema)

module.exports = Category