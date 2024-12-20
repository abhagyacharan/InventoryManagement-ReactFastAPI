import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";
import ProductsRow from "./ProductsRow";
import SuppliersRow from "./SuppliersRow";

const ProductsAndSuppliersTable = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [suppliers, setSuppliers] = useContext(SupplierContext);

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

    return (
        <>
            <div>
                <h3 className="text-center mb-3" style={{ textDecoration: "underline" }}>Products</h3>
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
                                handleDelete={(id) => handleDelete("http://127.0.0.1:8000/product/", id, setProducts, products.data)}
                                key={product.id}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>

            <hr style={{ height: "3px", backgroundColor: "#7a7a7a", border: "none" }}/>

            <div>
                <h3 className="text-center mb-3" style={{ textDecoration: "underline" }}>Suppliers</h3>
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
                                handleDelete={(id) => handleDelete("http://127.0.0.1:8000/supplier/", id, setSuppliers, suppliers.data)}
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
