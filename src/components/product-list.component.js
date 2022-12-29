import React from "react";
import { useForm } from "react-hook-form"

import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import axios from "axios";

const imagePath = "http://localhost:3500/uploads/"



export default function App() {
    //component did mount -> useEffect + useState
    const [category, setCategory] = React.useState([])
    React.useEffect(() => {
        axios.get("http://localhost:3500/category/")
            .then((res) => {
                console.log(res.data)
                setCategory(res.data)
            })
            .catch((err) => console.log(err))
    }, [])



    const [product, setProduct] = React.useState([])
    React.useEffect(() => {
        axios.get("http://localhost:3500/products/")
            .then((res) => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch((err) => console.log(err))
    }, [])



    const editProduct = (data) => {
        console.log(">>", data);
        window.location.href = "/edit/" + data._id;
    }



    const deleteProduct = (data) => {
        console.log(">>", data);
        let productid = data._id;
        axios.delete("http://localhost:3500/products/" + productid)
            .then((res) => {
                console.log(res.data)
                alert("Product Successfully Deleted")
                setProduct(product.filter((item) => item._id !== productid))
            })
            .catch((err) => {
                console.log(err)
                alert("Error Deleting Product")
            })

    }

    const {
        register,
        handleSubmit,
    } = useForm({ mode: "onTouched", reValidateMode: "onSubmit" })

    const Data = data => {
        console.log("Data >>" + data)
        if (data.category === "0") {
            window.location.reload()
        } else {
            var uri = "http://localhost:3500/products/sort/category"
        }

        const formData = {
            category: data.category
        }
        const SendData = async () => {
            axios.post(uri, formData)
                .then((res) => {
                    console.log(res)
                    setProduct(res.data)
                })
                .catch((err) => console.log(err))
        }
        SendData()

    }

    return (
        <Container>
            <Form className="border p-3 mb-5" onChange={handleSubmit(Data)}>
                <h3>Product List</h3>
                <p>Select Category for Manage </p>
                <Form.Group className="mb-3" >
                    <Form.Label>Category</Form.Label>
                    <Form.Select {...register("category")}>
                        <option value="0">Select Category</option>
                        {
                            category.map((item) => {
                                return <option value={item.categoryName}>{item.categoryName}</option>
                            })
                        }

                    </Form.Select>
                </Form.Group>
                {/* <Form.Group className="mb-3" >
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select >
                        <option value="" >Select Sub Category</option>
                        {
                            subCategory.map((item) => {
                                return <option value={item.subCategoryName}>{item.subCategoryName}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group> */}
                <Button type="submit">Search</Button>
            </Form>
            <h4 className="p-3">Products</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="">
                        <th>#</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        product.map((item) => {
                            return (
                                < tr >
                                    <td>{item._id}</td>
                                    <td><Image src={imagePath + item.productImage} width="100px" /></td>
                                    <td>{item.productName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.subCategory}</td>
                                    <td>{item.productDescription}</td>
                                    <td>
                                        <Button variant="secondary" className="m-1" data-item={item._id} onClick={() => editProduct(item)}>Edit</Button>
                                        <Button variant="danger" className="m-1" data-item={item._id} onClick={() => deleteProduct(item)}>Delete</Button>
                                    </td>
                                </tr>)
                        })
                    }


                </tbody>
            </Table>
        </Container >
    );
}