import React, { useContext, useState } from "react";
import { Form, Card, Button } from 'react-bootstrap';
import { UpdateContextSupplier } from "../UpdateSupplierContext";

const UpdateSupplier = () => {
    const [updateSupplierInfo, setUpdateSupplierInfo] = useContext(UpdateContextSupplier);

    const updateForm = (e) => {
        setUpdateSupplierInfo({ ...updateSupplierInfo, [e.target.name]: e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault()

        const url = "http://localhost:8000/supplier/" + updateSupplierInfo['SupplierId']

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updateSupplierInfo['SupplierName'],
                company: updateSupplierInfo['Company'],
                email: updateSupplierInfo['Email'],
                phone: updateSupplierInfo['Phone']
            })
        })

        response.json().then(resp => {
            if (resp.status === 'ok') {
                alert("Supplier updated.");
            } else {
                alert("Failed to update supplier.");
            }
        })

        setUpdateSupplierInfo({
            SupplierName: "",
            Company: "",
            Email: "",
            Phone: "",
            SupplierId: ""
        })
    }

    return (
        <>
        <Card>
            <Card.Body>
                <Form onSubmit={postData}>
                    <Form.Group controlId="SupplierName">
                        <Form.Label>Supplier Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="SupplierName"
                            value={updateSupplierInfo.SupplierName}
                            onChange={updateForm}
                            placeholder="Supplier Name" />
                    </Form.Group>

                    <Form.Group controlId="Company">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            type="text"
                            name="Company"
                            value={updateSupplierInfo.Company}
                            onChange={updateForm}
                            placeholder="Company" />
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="Email"
                            value={updateSupplierInfo.Email}
                            onChange={updateForm}
                            placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="Phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="Phone"
                            value={updateSupplierInfo.Phone}
                            onChange={updateForm}
                            placeholder="Phone" />
                    </Form.Group>

                    {/* <Form.Group controlId="Supplier">
                        <Form.Label>Supplier</Form.Label>
                        <Form.Control
                            type="number"
                            name="Supplier"
                            value={updateSupplierInfo.Supplier}
                            onChange={updateForm}
                            placeholder="Supplier" />
                    </Form.Group> */}

                    <Button className="mt-4" variant="primary" type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="d-flex justify-content-center mt-3">
                <Button href="/" variant="primary">Back</Button>
            </div>
        </>        
    )
}

export default UpdateSupplier;