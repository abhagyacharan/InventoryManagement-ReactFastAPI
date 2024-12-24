import React from "react";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { ProductProvider } from "./ProductContext";
import { SupplierProvider } from "./SupplierContext";
import ProductsTable from "./components/ProductsTable";
import SuppliersTable from "./components/SuppliersTable";
import ProductsAndSuppliersTable from "./components/ProductsTable";
import AddProducts from "./components/AddProducts";
import AddSuppliers from "./components/AddSuppliers";
import UpdateProduct from "./components/UpdateProduct";
import { UpdateProductContextProvider } from "./UpdateProductContext";
import { EmailContextProvider } from "./EmailContext";
import EmailPage from "./components/EmailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <ProductProvider>
          <SupplierProvider>
            <NavBar />
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <UpdateProductContextProvider>
                  <EmailContextProvider>
                    <Routes>
                      <Route exact path="/" Component={LandingPage} />
                      <Route exact path="/products" Component={ProductsTable} />
                      <Route exact path="/suppliers" Component={SuppliersTable} />
                      <Route exact path="/addproduct" Component={AddProducts} />
                      <Route exact path="/addsupplier" Component={AddSuppliers} />
                      <Route exact path="/updateproduct" Component={UpdateProduct} />
                      <Route exact path="/email" Component={EmailPage} />
                    </Routes>
                  </EmailContextProvider>
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
