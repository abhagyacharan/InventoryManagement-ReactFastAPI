import React, { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";

const NavBar = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [suppliers, setSuppliers] = useContext(SupplierContext);
    const [search, setSearch] = useState("");

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    const filterProduct = (e) => {
        e.preventDefault();
        const product = products.data.filter(product => product.name.toLowerCase() === search.toLowerCase())
        setProducts({"data" : [...product]})
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Badge className="mt-2" variant="primary">Products in Stock: {products.data.length}</Badge>
                    <Badge className="mt-2 ml-2" variant="primary">Suppliers: {suppliers.data.length}</Badge>
                </Nav>
                <Form onSubmit={filterProduct} className="d-flex justify-content-between align-items-center">
                    <Link to="/addproduct" className="btn btn-primary btn-sm mx-1" style={{ width: '200px', height: '30px' }}>Add Product</Link>
                    <Link to="/addsupplier" className="btn btn-primary btn-sm mx-1" style={{ width: '200px', height: '30px' }}>Add Supplier</Link>
                    <FormControl 
                        value={search}
                        onChange={updateSearch}
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