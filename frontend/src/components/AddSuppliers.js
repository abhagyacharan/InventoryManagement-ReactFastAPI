import React, { useState } from "react";
import { Form, Card, Button } from 'react-bootstrap';

const AddSuppliers = () => {

    const [supplierInfo, setSupplierInfo] = useState(
        {
            SupplierName: "",
            Company: "",
            Email: "",
            Phone: ""
        }
    )

    const updateForm = (e) => {
        setSupplierInfo(
            { ...supplierInfo, [e.target.name]: e.target.value }
        )
    }

    const postData = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8000/supplier/"

        const response = await fetch(
            url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "name": supplierInfo['SupplierName'],
                "company": supplierInfo['Company'],
                "email": supplierInfo['Email'],
                "phone": supplierInfo['Phone']
            })
        });
        response.json().then(response => {
            if (response.status === 'ok') {
                alert("Supplier added successfully")
            } else {
                alert("Failed to add supplier.")
            }
        });
        setSupplierInfo({
            SupplierName: "",
            Company: "",
            Email: "",
            Phone: ""
        });
    }
    return (
        <Card>
            <Card.Body>
                <Form onSubmit={postData}>
                    <Form.Group controlId="SupplierName">
                        <Form.Label>Supplier Name</Form.Label>
                        <Form.Control type="text" name="SupplierName"
                            value={supplierInfo.SupplierName} onChange={updateForm}
                            placeholder="Supplier Name" />
                    </Form.Group>

                    <Form.Group controlId="Company">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" name="Company"
                            value={supplierInfo.Company} onChange={updateForm}
                            placeholder="Company" />
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="Email"
                            value={supplierInfo.Email} onChange={updateForm}
                            placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="Phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" name="Phone"
                            value={supplierInfo.Phone} onChange={updateForm}
                            placeholder="Phone" />
                    </Form.Group>

                    <Button className="mt-4" variant="primary" type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddSuppliers;