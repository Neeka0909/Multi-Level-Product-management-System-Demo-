const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3500

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.set('strictQuery', false)
mongoose.connect(uri)
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Successfully established databse connection with MongoDB")
})

const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const subCategoryRouter = require('./routes/subCategory')

app.use('/products', productRouter)
app.use('/category', categoryRouter)
app.use('/subcategory', subCategoryRouter)

app.use('/uploads', express.static('uploads'));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})