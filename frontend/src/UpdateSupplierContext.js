
import React, {createContext, useState} from "react";

export const UpdateContextSupplier = createContext();

export const UpdateSupplierContextProvider = (props) => {
    const [updateSupplierInfo, setUpdateSupplierInfo] = useState({
        SupplierName: "",
        Company: "0",
        Email: "0",
        Phone: "0",
        SupplierId: ""
    });

    return (
        <UpdateContextSupplier.Provider value={[updateSupplierInfo, setUpdateSupplierInfo]}>
            {props.children}
        </UpdateContextSupplier.Provider>
    )
};