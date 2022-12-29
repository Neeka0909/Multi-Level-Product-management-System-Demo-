import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
// For Live Previwe of Card
// import Card from 'react-bootstrap/Card'
// import ListGroup from 'react-bootstrap/ListGroup'
// import cardImage from "../img/placeholder.jpg"
// import { Container } from "react-bootstrap"

//const imagePath = "http://localhost:3500/uploads/" // for image path

function AddProduct() {


    const [product, setProduct] = React.useState([])
    React.useEffect(() => {
        let id = window.location.pathname.split("/")[2] // get id from url
        axios.get("http://localhost:3500/products/" + id)
            .then((res) => {
                console.log(">>>" + res.data)
                setProduct(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const {
        register,
        //watch, // for live preview
        handleSubmit,
        //formState: { errors }
    } = useForm({ mode: "onTouched", reValidateMode: "onSubmit" })
    //const watchAllFields = watch() // watch all fields (for live preview)



    const Data = (data) => {
        console.log(data)
        let formData = {
            category: data.category,
            subCategory: data.subCategory,
            productName: data.productName,
            productPrice: data.productPrice,
            productDescription: data.productDescription,
            productImage: data.productImg[0]
        }
        //console.log(formData)
        const SendData = async () => {
            try {
                let id = window.location.pathname.split("/")[2] // get id from url
                const response = await axios.post('http://localhost:3500/products/update/' + id, formData)
            console.log(response)
            alert("Product Updated Successfully")
            window.location.reload()
        } catch (error) {
            console.log(error)
            alert("Error Update Product")

        }
    }
    SendData()
    console.log(formData)
}

//component did mount -> useEffect + useState
const [category, setCategory] = React.useState([])
const [subCategory, setSubCategory] = React.useState([])

React.useEffect(() => {
    axios.get("http://localhost:3500/category/")
        .then((res) => {
            console.log(res.data)
            setCategory(res.data)
        })
        .catch((err) => console.log(err))

    axios.get("http://localhost:3500/subcategory/")
        .then((res) => {
            console.log(res.data)
            setSubCategory(res.data)
        })
        .catch((err) => console.log(err))
}, [])

return (
    <>
        <Row className="mb-3 p-3 justify-content-md-center">
            <Col md="6">
                <Form noValidate onSubmit={handleSubmit(Data)} className="border p-3" >
                    <h3>Edit Product </h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Category</Form.Label>
                            <Form.Select {...register("category")}>
                                <option value={product.category}>{product.category}y</option>
                                {
                                    category.map((item) => {
                                        return <option value={item.categoryName}>{item.categoryName}</option>
                                    })
                                }
                            </Form.Select>


                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12"  >
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Select {...register("subCategory")}>
                                <option value={product.subCategory}>{product.subCategory}</option>
                                {
                                    subCategory.map((item) => {
                                        return <option value={item.subCategoryName}>{item.subCategoryName}</option>
                                    })
                                }
                            </Form.Select>

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" defaultValue={product.productName} placeholder={product.productName} {...register("productName")} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" defaultValue={product.productPrice} placeholder={product.productPrice} {...register("productPrice")} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file" accept=".jpg,.png" name="productImage" {...register("productImg")} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={product.productDescription} placeholder={product.productDescription} {...register("productDescription")} />

                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit</Button>
                </Form>
            </Col>

            {/* <Col md="6 border">
                    <Container fluid className="p-3">
                        <h3>Product Preview</h3>
                        <Card style={{ width: '25rem' }}>
                            <Card.Img variant="top" src={imagePath + product.productImage} width="100px" />
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>

                                        <Card.Title>{watchAllFields.productName}</Card.Title>

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Subtitle>{watchAllFields.category} / {watchAllFields.subCategory}</Card.Subtitle>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Subtitle>Price : {watchAllFields.productPrice}</Card.Subtitle>
                                    </ListGroup.Item>

                                </ListGroup>

                                <Card.Text>
                                    {watchAllFields.productDescription}
                                </Card.Text>
                                <Button variant="primary">Buy</Button>
                            </Card.Body>
                        </Card>
                    </Container>

                </Col> */}
        </Row>
    </>
)
}

export default AddProduct
