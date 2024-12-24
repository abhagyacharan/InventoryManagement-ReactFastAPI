import React, { useState } from "react";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { SupplierProvider } from "./SupplierContext";
import ProductsAndSuppliersTable from "./components/ProductsTable";
import AddProducts from "./components/AddProducts";
import AddSuppliers from "./components/AddSuppliers";
import UpdateProduct from "./components/UpdateProduct";
import { UpdateProductContextProvider } from "./UpdateProductContext";
import { UpdateSupplierContextProvider } from "./UpdateSupplierContext";
import { EmailContextProvider } from "./EmailContext";
import EmailPage from "./components/EmailPage";
import UpdateSupplier from "./components/UpdateSupplier";

function App() {

  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="App">
      <Router>
        <ProductProvider>
          <SupplierProvider>
            <NavBar activeTab={activeTab} />
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <UpdateProductContextProvider>
                  <UpdateSupplierContextProvider>
                    <EmailContextProvider>
                      <Routes>
                        <Route
                          exact
                          path="/" element={
                            <ProductsAndSuppliersTable
                              activeTab={activeTab}
                              setActiveTab={setActiveTab} />
                          } />
                        <Route exact path="/addproduct" Component={AddProducts} />
                        <Route exact path="/addsupplier" Component={AddSuppliers} />
                        <Route exact path="/updateproduct" Component={UpdateProduct} />
                        <Route exact path="/updatesupplier" Component={UpdateSupplier} />
                        <Route exact path="/email" Component={EmailPage} />
                      </Routes>
                    </EmailContextProvider>
                  </UpdateSupplierContextProvider>
                </UpdateProductContextProvider>
              </div>
            </div>
          </SupplierProvider>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
