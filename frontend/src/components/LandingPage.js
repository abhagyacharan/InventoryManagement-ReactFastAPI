import React, { useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";
import { SupplierContext } from "../SupplierContext";
import "./LandingPage.css";

const LandingPage = () => {

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

    return (
        <div className="landing-page d-flex justify-content-center align-items-center" style={{ height: "80vh"}}>
            <div className="button-container text-center">
                <Link to="/products">
                    <Button className="btn btn-primary mb-3 btn-lg">Products</Button>
                </Link>
                <div className="divider d-flex justify-content-center align-items-center">
                    <span className="font-weight-normal" style={{fontSize: '20px'}}>----------or----------</span>
                </div>
                <Link to="/suppliers">
                    <Button className="btn btn-secondary mt-3 btn-lg">Suppliers</Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
