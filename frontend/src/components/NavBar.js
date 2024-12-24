import React, { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";

const NavBar = ({ activeTab }) => {
    const [products, setProducts] = useContext(ProductContext);
    const [suppliers, setSuppliers] = useContext(SupplierContext);
    const [search, setSearch] = useState("");

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const filterItems = (e) => {
        e.preventDefault();
        if (activeTab === 'products') {
            const product = products.data.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
            setProducts({ "data": [...product] });
        } else {
            const supplier = suppliers.data.filter(supplier => supplier.name.toLowerCase().includes(search.toLowerCase()));
            setSuppliers({ "data": [...supplier] });
        }

    };

    return (
        <Navbar bg="dark" expand="lg" variant="dark" style={{backgroundColor: '#8c8c8c'}}>
            <Navbar.Brand href="/">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form onSubmit={filterItems} className="d-flex justify-content-between align-items-center ml-auto">
                    {activeTab === "products" && (
                        <>
                            <Link to="/addproduct" className="btn btn-primary btn-sm mx-1" style={{ width: '200px', height: '30px' }}>Add Product</Link>
                            <FormControl
                                value={search}
                                onChange={updateSearch}
                                type="text"
                                placeholder="Search Products"
                                className="mx-2"
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </>
                    )}

                    {activeTab === "suppliers" && (
                        <>
                            <Link to="/addsupplier" className="btn btn-primary btn-sm mx-1" style={{ width: '200px', height: '30px' }}>Add Supplier</Link>
                            <FormControl
                                value={search}
                                onChange={updateSearch}
                                type="text"
                                placeholder="Search Suppliers"
                                className="mx-2"
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </>
                    )}
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
