import React from "react";
import { Button } from "react-bootstrap";

const ProductsRow = ({id, name, quantity_in_stock, quantity_sold, unit_price, revenue, handleDelete, handleUpdate, handleSupplier}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{quantity_in_stock}</td>
            <td>{quantity_sold}</td>
            <td>{unit_price}</td>
            <td>{revenue}</td>
            <td>
                <Button onClick={() => handleUpdate(id)} className="btn btn-primary-info btn-sm ml-1 mr-2">Update</Button>
                <Button onClick={() => handleSupplier(id)} className="btn btn-success btn-sm mr-2">Supplier</Button>
                <Button onClick={() => handleDelete(id)} className="btn btn-danger btn-sm mr-2">Delete</Button>
            </td>
        </tr>
    )
}

export default ProductsRow;