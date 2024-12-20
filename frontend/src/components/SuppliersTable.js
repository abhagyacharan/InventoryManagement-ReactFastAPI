import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { SupplierContext } from "../SupplierContext";
import SuppliersRow from "./SuppliersRow";

const SuppliersTable = () => {
    const [suppliers, setSuppliers] = useContext(SupplierContext);

    const handleDelete = (id) => {
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
                setSuppliers({data : [...filteredSuppliers]})
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
                              handleDelete={handleDelete}
                              key={supplier.id}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default SuppliersTable;