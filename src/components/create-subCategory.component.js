import React from "react"
import { useForm } from "react-hook-form"

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import axios from "axios"


function CreateSubCategoryForm() {
    const {
        register,
        //watch, // for live preview
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onTouched", reValidateMode: "onSubmit" })

    //const watchAllFields = watch() // watch all fields (for live preview)
    const [category, setCategory] = React.useState([])
    React.useEffect(() => {
        axios.get("http://localhost:3500/category/")
            .then((res) => {
                console.log(res.data)
                setCategory(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const Data = (data) => {
        console.log(data)
        let CreateSubCategoryFormData = {
            categoryName: data.category,
            subCategoryName: data.subCategory
        }

        const SendData = async () => {
            try {
                const response = await axios.post('http://localhost:3500/subcategory/add/', CreateSubCategoryFormData)
                console.log(response)
                alert("Sub Category Added Successfully")
                window.location.reload()
            } catch (error) {
                console.log(error)
                alert("Error Adding Sub Category")

            }
        }
        SendData()

    }

    return (
        <Form noValidate onSubmit={handleSubmit(Data)} className="border p-3 mt-4">
            <h3>Create Sub Category </h3>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01" >
                    <Form.Label>Category</Form.Label>
                    <Form.Select  {...register("category", { required: "Please Select Category" })}>
                        <option value="">Open this select menu</option>
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
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Sub Category name</Form.Label>
                    <Form.Control
                        {...register("subCategory", { required: "Please Provide a Sub Category Name" })}
                        type="text"
                        placeholder="Sub Category Name"
                    />
                    {errors.subCategory && (
                        <Form.Text className="text-danger">
                            {errors.subCategory.message}
                        </Form.Text>
                    )}
                </Form.Group>

            </Row>
            <Button type="submit">Save </Button>
        </Form>
    );
}

export default CreateSubCategoryForm