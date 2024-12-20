import React from "react";
import { Button } from "react-bootstrap";

const SuppliersRow = ({id, name, company, email, phone, handleDelete}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{company}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <Button className="btn btn-primary-info btn-sm ml-1 mr-2">Update</Button>
                <Button className="btn btn-success btn-sm mr-2">Supplier</Button>
                <Button onClick={() => handleDelete(id)} className="btn btn-danger btn-sm mr-2">Delete</Button>
            </td>
        </tr>
    )
}

export default SuppliersRow;