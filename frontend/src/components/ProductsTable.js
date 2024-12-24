import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Badge } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";
import ProductsRow from "./ProductsRow";
import SuppliersRow from "./SuppliersRow";
import { UpdateContext } from "../UpdateProductContext";
import { UpdateContextSupplier } from "../UpdateSupplierContext";
import { EmailContext } from "../EmailContext";

const ProductsAndSuppliersTable = ({ activeTab, setActiveTab }) => {
    const [products, setProducts] = useContext(ProductContext);
    const [suppliers, setSuppliers] = useContext(SupplierContext);
    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext);
    const [updateSupplierInfo, setUpdateSupplierInfo] = useContext(UpdateContextSupplier);
    const [emailDetails, setEmailDetails] = useContext(EmailContext);

    let navigate = useNavigate();

    const fetchData = (url, setData) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((results) => setData({ data: [...results.data] }))
            .catch((error) => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchData("http://127.0.0.1:8000/product/", setProducts);
        fetchData("http://127.0.0.1:8000/supplier/", setSuppliers);
    }, []);

    const handleDelete = (url, id, setData, data) => {
        fetch(url + id, { method: "DELETE", headers: { accept: "application/json" } })
            .then(resp => resp.json())
            .then(result => {
                if (result.status === "ok") {
                    const filteredData = data.filter((item) => item.id !== id);
                    setData({ data: [...filteredData] });
                    alert("Deleted successfully.");
                } else alert("Deletion failed.");
            });
    };

    const handleUpdateProduct = (id) => {
        const product = products.data.filter(product => product.id === id)[0];
        setUpdateProductInfo({
            ProductName: product.name,
            QuantityInStock: product.quantity_in_stock,
            QuantitySold: product.quantity_sold,
            UnitPrice: product.unit_price,
            Revenue: product.revenue,
            ProductId: id
        });
        navigate("/updateproduct");
    };

    const handleUpdateSupplier = (id) => {
        const supplier = suppliers.data.filter(supplier => supplier.id === id)[0];
        setUpdateSupplierInfo({
            SupplierName: supplier.name,
            Company: supplier.company,
            Email: supplier.email,
            Phone: supplier.phone,
            SupplierId: id
        });
        navigate("/updatesupplier");
    };

    const handleSupplier = (id) => {
        fetch("http://localhost:8000/supplier/" + id, {
            headers: {
                Accept: 'application/json'
            }
        }).then(resp => resp.json())
            .then(result => {
                if (result.status === 'ok') {
                    setEmailDetails({ ...result.data });
                    navigate("/email");
                } else {
                    alert("Error fetching supplier details.");
                }
            });
    };

    const renderBadges = (activeTab) => {
        if (activeTab === "products") {
            return (
                <div className="ml-auto d-flex align-items-center">
                    <Badge className="mr-2" variant="primary" style={{ fontSize: '18px', padding: '10px 20px' }}>
                        Products in Stock: {products.data.length}
                    </Badge>
                </div>
            );
        } if (activeTab === "suppliers") {
            return (
                <div className="ml-auto d-flex align-items-center">

                    <Badge variant="primary" style={{ fontSize: '18px', padding: '10px 20px' }}>
                        Suppliers: {suppliers.data.length}
                    </Badge>
                </div>
            );

        }
        return null;
    };

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-center mb-4">
                <Button
                    variant={activeTab === "products" ? "primary" : "secondary"}
                    className="mr-2"
                    onClick={() => setActiveTab("products")}
                >
                    Products
                </Button>
                <Button
                    variant={activeTab === "suppliers" ? "primary" : "secondary"}
                    onClick={() => setActiveTab("suppliers")}
                >
                    Suppliers
                </Button>
                {renderBadges(activeTab)}
            </div>

            {activeTab === "products" && (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Quantity in Stock</th>
                                <th>Quantity Sold</th>
                                <th>Unit Price</th>
                                <th>Revenue</th>
                                <th style={{ width: "250px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product) => (
                                <ProductsRow
                                    {...product}
                                    handleUpdate={(id) => handleUpdateProduct(id)}
                                    handleDelete={(id) => handleDelete("http://127.0.0.1:8000/product/", id, setProducts, products.data)}
                                    handleSupplier={(id) => handleSupplier(id)}
                                    key={product.id}
                                />
                            ))}
                        </tbody>
                    </Table>

                </>
            )}
            {activeTab === "suppliers" && (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Supplier Name</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th style={{ width: "250px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.data.map((supplier) => (
                                <SuppliersRow
                                    {...supplier}
                                    handleUpdate={(id) => handleUpdateSupplier(id)}
                                    handleDelete={(id) => handleDelete("http://127.0.0.1:8000/supplier/", id, setSuppliers, suppliers.data)}
                                    key={supplier.id}
                                />
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default ProductsAndSuppliersTable;