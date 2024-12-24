import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
    return (
      <div className="landing-page">
        <div className="button-container">
          <Link to="/products">
            <Button className="btn btn-primary">Products</Button>
          </Link>
          <Link to="/suppliers">
            <Button className="btn btn-secondary">Suppliers</Button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default LandingPage;