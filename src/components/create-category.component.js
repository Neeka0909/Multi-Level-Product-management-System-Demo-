import React from "react"
import { useForm } from "react-hook-form"

import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import axios from "axios"

import CreateSubCategoryForm from "./create-subCategory.component"

function CreateCategory() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", reValidateMode: "onSubmit" })

    const Data = (data) => {
        console.log(data)
        let CreateCategoryData = {
            categoryName: data.category
        }
        const SendData = async () => {
            try {
                const response = await axios.post('http://localhost:3500/category/add/', CreateCategoryData)
                console.log(response)
                alert("Category Added Successfully")
                window.location.reload()
            } catch (error) {
                console.log(error)
                alert("Error Adding Category")

            }
        }
        SendData()
    }

    return (
        <Container>
            <Form noValidate onSubmit={handleSubmit(Data)} className="border p-3">
                <h3>Create Category</h3>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" >
                        <Form.Label>Category name</Form.Label>
                        <Form.Control
                            {...register("category", { required: "Please Provide a Category Name" })}
                            type="text"
                            placeholder="Category Name"
                        />
                        {errors.category && (
                            <Form.Text className="text-danger">
                                {errors.category.message}
                            </Form.Text>
                        )}

                    </Form.Group>
                </Row>

                <Button type="submit">Save</Button>
            </Form>
            <CreateSubCategoryForm />
        </Container>

    );
}



export default CreateCategory 