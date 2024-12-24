import React, {useState, createContext, use} from "react";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [products, setProducts] = useState({
        "data" : [],
        "originalData" : [],
    })

    return(
        <ProductContext.Provider value={[products, setProducts]}>
            {props.children}
        </ProductContext.Provider>
    );
}