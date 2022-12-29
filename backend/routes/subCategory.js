const router = require('express').Router()
let subCategory = require('../models/subcategory.model')

router.route('/').get((req, res) => {
    subCategory.find()
        .then(subcategory => res.json(subcategory))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const categoryName= req.body.categoryName
    const subCategoryName = req.body.subCategoryName
    const newSubCategory = new subCategory({ categoryName,subCategoryName })

    newSubCategory.save()
        .then(() => {
            res.json('SubCategory added')
            console.log(subCategoryName + "subcategory added")
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router