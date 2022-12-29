import React from "react"
//import { useState, useEffect } from "react"
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

function AddProduct() {

    const {
        register,
        //watch, // for live preview
        handleSubmit,
        formState: { errors }
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
                const response = await axios.post('http://localhost:3500/products/add/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                console.log(response)
                alert("Product Added Successfully")
                window.location.reload()
            } catch (error) {
                console.log(error)
                alert("Error Adding Product")

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
                        <h3>Add Product</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Category</Form.Label>
                                <Form.Select {...register("category", { required: "Please Select Category" })}>
                                    <option value="">Select Category</option>
                                    {
                                        category.map((item) => {
                                            return <option value={item.categoryName}>{item.categoryName}</option>
                                        })
                                    }
                                </Form.Select>

                                {errors.category && (
                                    <Form.Text className="text-danger">
                                        {errors.category.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12"  >
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Select {...register("subCategory", { required: "Please Select a Sub Category" })}>
                                    <option value="">Select Sub Category</option>
                                    {
                                        subCategory.map((item) => {
                                            return <option value={item.subCategoryName}>{item.subCategoryName}</option>
                                        })
                                    }
                                </Form.Select>
                                {errors.subCategory && (
                                    <Form.Text className="text-danger">
                                        {errors.subCategory.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" >
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Product Name"  {...register("productName", { required: "Please provide a Product Name" })} required />
                                {errors.productName && (
                                    <Form.Text className="text-danger">
                                        {errors.productName.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Price"  {...register("productPrice", { required: "Please provide a Price." })} required />
                                {errors.productPrice && (
                                    <Form.Text className="text-danger">
                                        {errors.productPrice.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" >
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="file" accept=".jpg,.png" name="productImage" {...register("productImg", { required: "Please provide a image." })} />
                                {errors.productImg && (
                                    <Form.Text className="text-danger">
                                        {errors.productImg.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" >
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control as="textarea" rows={3} required  {...register("productDescription", { required: "Please provide a Description." })} />
                                {errors.productDescription && (
                                    <Form.Text className="text-danger">
                                        {errors.productDescription.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Col>

                {/* <Col md="6 border">
                    <Container fluid className="p-3">
                        <h3>Product Preview</h3>
                        <Card style={{ width: '25rem' }}>
                            <Card.Img variant="top" src={cardImage} width="100px" />
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        {watchAllFields.productName ? (
                                            <Card.Title>{watchAllFields.productName}</Card.Title>
                                        ) : ("")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Subtitle>Category / Sub Category</Card.Subtitle>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Subtitle>Price : $$$</Card.Subtitle>
                                    </ListGroup.Item>

                                </ListGroup>

                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
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
