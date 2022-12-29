const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subCategoryrSchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    subCategoryName: {
        type: String,
        required: true,
        minlength: 3
    }
}, {
    timestamps: true,
})

const SubCategory = mongoose.model('SubCategory', subCategoryrSchema)

module.exports = SubCategory