const router = require('express').Router()
let Product = require('../models/product.model')
const path = require('path')

router.route('/').get((req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
})

//set storage engine
const multer = require('multer')
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})
//upload middleware
const upload = multer({ storage: imgStorage }).single('productImage')




router.route('/add').post((req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const category = req.body.category
            const subCategory = req.body.subCategory
            const productName = req.body.productName
            const productPrice = req.body.productPrice
            const productDescription = req.body.productDescription
            const productImage = req.file.filename

            console.log(productImage)

            const newProduct = new Product({
                category,
                subCategory,
                productName,
                productPrice,
                productDescription,
                productImage
            })

            newProduct.save()
                .then(() => res.json('product added'))
                .catch(err => res.status(400).json('Error: ' + err))
        }
    })
})

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.category = req.body.category
            product.subCategory = req.body.subCategory
            product.productName = req.body.productName
            product.productPrice = req.body.productPrice
            product.productDescription = req.body.productDescription

            product.save()
                .then(() => res.json('Exericse updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/sort/category').post((req, res) => {
    Product.find({ category: req.body.category })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
})

// router.route('/sort/category').get((req, res) => {
//     Product.find({ category: req.body.category })
//         .then(product => res.json(product))
//         .catch(err => res.status(400).json('Error: ' + err))
// })


module.exports = router