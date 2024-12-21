import React, {useState, useContext, createContext} from "react";

export const EmailContext = createContext();

export const EmailContextProvider = (props) => {
    const [emailDetails, setEmailDetails] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        id: "",
        emailTitle: "",
        emailContent: ""
    })

    return (
        <EmailContext.Provider value={[emailDetails, setEmailDetails]}>
            {props.children}
        </EmailContext.Provider>
    )
}