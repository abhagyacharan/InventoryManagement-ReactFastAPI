# Inventory Management System Documentation

## Overview

The Inventory Management System manages products and their associated suppliers, including functionalities like adding, updating, retrieving, and deleting records, as well as sending email notifications to suppliers. Below is a structured documentation of the project.

---

## Images 
- **Products**
![Products](https://github.com/user-attachments/assets/b9617fac-9b19-45ee-b7a5-f674d8774f2b)
- **Suppliers**
![Suppliers](https://github.com/user-attachments/assets/32341ccf-64cc-44ee-a8be-8affe30afff5)


## Backend (FastAPI)
- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: Tortoise-ORM
- **Environment Variables**: Stored in `.env` file

### Key Files
- `app.py`: Main application file containing API endpoints.
- `models.py`: Database models for `Product` and `Supplier`.
- `requirements.txt`: Python dependencies.

### API Endpoints
- **Supplier Endpoints**
  - `POST /supplier`: Add a new supplier.
  - `GET /supplier`: Retrieve all suppliers.
  - `GET /supplier/{supplier_id}`: Retrieve a specific supplier by ID.
  - `PUT /supplier/{supplier_id}`: Update supplier details.
  - `DELETE /supplier/{supplier_id}`: Delete a supplier by ID.

- **Product Endpoints**
  - `POST /product/{supplier_id}`: Add a new product associated with a supplier.
  - `GET /product`: Retrieve all products.
  - `GET /product/{id}`: Retrieve a specific product by ID.
  - `PUT /product/{id}`: Update product details.
  - `DELETE /product/{id}`: Delete a product by ID.

- **Email Notification Endpoint**
  - `POST /email/{product_id}`: Send an email to the supplier of a specific product.

## Frontend (React)
- **Frameworks**: React, Bootstrap
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **HTTP Client**: Fetch API

### Key Files
- `App.js`: Main application component with routing.
- `ProductContext.js`: Context for managing product state.
- `SupplierContext.js`: Context for managing supplier state.
- `components/`: Directory containing React components.

### Key Components
- `ProductsTable.js`: Displays a table of products.
- `SuppliersTable.js`: Displays a table of suppliers.
- `AddProducts.js`: Form to add a new product.
- `AddSuppliers.js`: Form to add a new supplier.
- `UpdateProduct.js`: Form to update product details.
- `UpdateSupplier.js`: Form to update supplier details.
- `EmailPage.js`: Form to send an email to a supplier.

## Setup and Deployment
1. **Backend Setup**
   - Create a virtual environment and activate it:
     ```sh
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install dependencies:
     ```sh
     pip install -r api/requirements.txt
     ```
   - Run the FastAPI server:
     ```sh
     uvicorn api.app:app --reload
     ```

2. **Frontend Setup**
   - Navigate to the [frontend](http://_vscodecontentref_/23) directory:
     ```sh
     cd frontend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the React development server:
     ```sh
     npm start
     ```

## Future Enhancements
- Implement user authentication and authorization.
- Add more detailed logging and error handling.
- Improve the UI/UX of the frontend application.
---


