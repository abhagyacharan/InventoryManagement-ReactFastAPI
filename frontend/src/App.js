import React from "react";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { SupplierProvider } from "./SupplierContext";
import ProductsTable from "./components/ProductsTable";
import SuppliersTable from "./components/SuppliersTable";
import ProductsAndSuppliersTable from "./components/ProductsTable";
import AddProducts from "./components/AddProducts";
import AddSuppliers from "./components/AddSuppliers";

function App() {
  return (
    <div className="App">
      <Router>
        <ProductProvider>
          <SupplierProvider>
            <NavBar />
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <Routes>
                  <Route exact path="/" Component={ProductsAndSuppliersTable} />
                  <Route exact path="/addproduct" Component={AddProducts} />
                  <Route exact path="/addsupplier" Component={AddSuppliers} />
                </Routes>
              </div>
            </div>
          </SupplierProvider>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
