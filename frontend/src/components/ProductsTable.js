import React, { useContext, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";
import ProductsRow from "./ProductsRow";
import SuppliersRow from "./SuppliersRow";
import UpdateProduct from "./UpdateProduct";
import { UpdateContext } from "../UpdateProductContext";
import { EmailContext } from "../EmailContext";

const ProductsAndSuppliersTable = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [suppliers, setSuppliers] = useContext(SupplierContext);
    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext);
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

    const handleUpdate = (id) => {
        const product = products.data.filter(product => product.id === id)[0]
        setUpdateProductInfo({
            ProductName: product.name,
            QuantityInStock: product.quantity_in_stock,
            QuantitySold: product.quantity_sold,
            UnitPrice: product.unit_price,
            Revenue: product.revenue,
            ProductId: id
        })
        navigate("/updateproduct");
    }

    const handleSupplier = (id) => {
        console.log(id)
        fetch("http://localhost:8000/supplier/" + id, {
            headers: {
                Accept: 'application/json'
            }
        }).then(resp => {
            return resp.json()
        }).then(result => {
            if (result.status === 'ok') {
                setEmailDetails({ ...result.data })
                navigate("/email")
            }
            else {
                alert("error")
            }
        })

    }

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
                                handleUpdate={(id) => handleUpdate(id)}
                                handleDelete={(id) => handleDelete("http://127.0.0.1:8000/product/", id, setProducts, products.data)}
                                handleSupplier={(id) => handleSupplier(id)}
                                key={product.id}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* <hr style={{ height: "3px", backgroundColor: "#7a7a7a", border: "none" }} />

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
            </div> */}
        </>
    );
};

export default ProductsAndSuppliersTable;
