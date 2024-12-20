import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";
import ProductsRow from "./ProductsRow";
import SuppliersRow from "./SuppliersRow";

const ProductsAndSuppliersTable = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [suppliers, setSuppliers] = useContext(SupplierContext);

    const handleDeleteProduct = (id) => {
        fetch("http://127.0.0.1:8000/product/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(result => {
                if (result.status === "ok") {
                    const filteredProducts = products.data.filter((product) => product.id !== id);
                    setProducts({ data: [...filteredProducts] })
                    alert("Product deleted successfully.")
                } else {
                    alert("Product deletion failed.")
                }
            })
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product/")
            .then((resp) => {
                console.log("Response status:", resp.status);
                return resp.json();
            })
            .then((results) => {
                console.log("Fetched data:", results);
                setProducts({ data: [...results.data] });
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleDeleteSupplier = (id) => {
        fetch("http://127.0.0.1:8000/supplier/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(result => {
                if (result.status === "ok") {
                    const filteredSuppliers = suppliers.data.filter((supplier) => supplier.id !== id);
                    setSuppliers({ data: [...filteredSuppliers] })
                    alert("Supplier deleted successfully.")
                } else {
                    alert("Supplier deletion failed.")
                }
            })
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/supplier/")
            .then((resp) => {
                console.log("Response status:", resp.status);
                return resp.json();
            })
            .then((results) => {
                setSuppliers({ data: [...results.data] });
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    return (
        <>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Quantity in Stock</th>
                            <th>Quantity Sold</th>
                            <th>Unit Price</th>
                            <th>Revenue</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((product) => (
                            <ProductsRow
                                id={product.id}
                                name={product.name}
                                quantity_in_stock={product.quantity_in_stock}
                                quantity_sold={product.quantity_sold}
                                unit_price={product.unit_price}
                                revenue={product.revenue}
                                handleDelete={handleDeleteProduct}
                                key={product.id}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Supplier Name</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.data.map((supplier) => (
                            <SuppliersRow
                                id={supplier.id}
                                name={supplier.name}
                                company={supplier.company}
                                email={supplier.email}
                                phone={supplier.email}
                                handleDelete={handleDeleteSupplier}
                                key={supplier.id}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ProductsAndSuppliersTable;