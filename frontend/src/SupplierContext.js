import React, { useState, createContext } from "react";

export const SupplierContext = createContext();

export const SupplierProvider = (props) => {
    const [suppliers, setSuppliers] = useState({"data" : []})

    return(
        <SupplierContext.Provider value={[suppliers, setSuppliers]}>
            {props.children}
        </SupplierContext.Provider>
    );
}