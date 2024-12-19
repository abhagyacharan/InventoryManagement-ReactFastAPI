import React from "react";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import ProductsTable from "./components/ProductsTable";
import AddProducts from "./components/AddProducts";

function App() {
  return (
    <div className="App">
      <Router>
        <ProductProvider>
          <NavBar />
          <div className="row">
            <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
              

              <Routes>
                <Route exact path="/" Component={ProductsTable}/>

                <Route exact path="/addproduct" Component={AddProducts} />
              </Routes>
            </div>
          </div>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
