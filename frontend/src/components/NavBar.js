import React, { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductContext } from "../ProductContext";

const NavBar = () => {
    const [products] = useContext(ProductContext);

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Badge className="mt-2" variant="primary">Products in Stock: {products.data.length}</Badge>
                </Nav>
                <Form className="d-flex justify-content-between align-items-center">
                    <Link to="/addproduct" className="btn btn-primary btn-sm mx-1" style={{ width: '150px' }}>Add Product</Link>
                    <Link to="/addsupplier" className="btn btn-primary btn-sm mx-1" style={{ width: '150px' }}>Add Supplier</Link>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mx-2"
                    />
                    <Button type="submit" variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
