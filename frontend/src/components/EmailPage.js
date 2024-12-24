import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { EmailContext } from '../EmailContext';

const EmailPage = () => {
    const [emailDetails, setEmailDetails] = useContext(EmailContext);

    const updateForm = (e) => {
        setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
    };

    const handelAdd = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/supplier';

        const response = await fetch(url, {
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
                name: emailDetails['name'],
                email: emailDetails['email'],
                phone: emailDetails['phone'],
                company: emailDetails['company']
            })
        });

        response.json().then((response) => {
            if (response.status === 'ok') {
                alert('Supplier added successfully');
            } else {
                alert('Failed to add Supplier');
            }
        });
        setEmailDetails({
            name: "",
            email: "",
            phone: "",
            company: "",
            emailTitle: "",
            emailContent: ""
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/supplier/' + emailDetails['id'];

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                name: emailDetails['name'],
                email: emailDetails['email'],
                phone: emailDetails['phone'],
                company: emailDetails['company']
            })
        });

        response.json().then((response) => {
            if (response.status === 'ok') {
                alert('Supplier updated successfully');
            } else {
                alert('Failed to updated Supplier');
            }
        });
    };

    const handleDelete = () => {
        fetch('http://127.0.0.1:8000/supplier/' + emailDetails['id'], {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            }
        })
            .then((resp) => {
                return resp.json();
            })
            .then(
                (result) => {
                    if (result.status === 'ok') {
                        setEmailDetails({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            emailTitle: "",
                            emailContent: "",
                            id: ""
                        });
                        alert('Supplier deleted successfully');
                    } else {
                        alert('Supplier deletion failed');
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const handleEmail = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/email/' + emailDetails['id'];
        console.log(emailDetails['id'])

        const response = await fetch(url, {
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
                message: emailDetails['emailContent'],
                subject: emailDetails['emailTitle']
            })
        });

        response.json().then((response) => {
            if (response.status === 'ok') {
                alert('Email sent successfully');
            } else {
                alert('Failed to send email');
            }
        });
        setEmailDetails({
            emailTitle: '',
            emailContent: ''
        });
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                value={emailDetails.name}
                                onChange={updateForm}
                                placeholder='Supplier&#39;s Name'
                            />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                value={emailDetails.email}
                                onChange={updateForm}
                                placeholder='Email Address'
                            />
                        </Form.Group>

                        <Form.Group controlId='phone'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type='number'
                                name='phone'
                                value={emailDetails.phone}
                                onChange={updateForm}
                                placeholder='Phone'
                            />
                        </Form.Group>

                        <Form.Group controlId='company'>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type='text'
                                name='company'
                                value={emailDetails.company}
                                onChange={updateForm}
                                placeholder='Company'
                            />
                        </Form.Group>

                        <Form.Group controlId='emailTitle'>
                            <Form.Label>Email Title</Form.Label>
                            <Form.Control
                                type='Text'
                                name='emailTitle'
                                value={emailDetails.emailTitle}
                                onChange={updateForm}
                                placeholder='Email Title'
                            />
                        </Form.Group>

                        <Form.Group controlId='emailContent'>
                            <Form.Label>Email Content</Form.Label>
                            <Form.Control
                                type='textfield'
                                name='emailContent'
                                value={emailDetails.emailContent}
                                onChange={updateForm}
                                placeholder='Email Content'
                            />
                        </Form.Group>
                        <div className='mt-3'>
                            <Button onClick={handleUpdate} className='btn btn-primary-info m-1' variant='primary'>
                                Update
                            </Button>

                            <Button onClick={handelAdd} className='btn btn-success m-1' variant='primary'>
                                Add Supplier
                            </Button>

                            <Button onClick={handleEmail} className='btn btn-secondary m-1' variant='primary'>
                                SendEmail
                            </Button>

                            <Button onClick={handleDelete} className='btn btn-danger m-1' variant='primary'>
                                Delete
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
            <div className="d-flex justify-content-center mt-3">
                <Button href="/" variant="primary">Back</Button>
            </div>
        </>
    );
};

export default EmailPage;