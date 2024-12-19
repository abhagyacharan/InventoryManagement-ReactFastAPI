# Inventory Management System Documentation

## Overview
This project is a full-stack inventory management application that utilizes:
- **Backend**: FastAPI
- **Frontend**: React
- **Database**: SQLite3

The system manages products and their associated suppliers, including functionalities like adding, updating, retrieving, and deleting records, as well as sending email notifications to suppliers. Below is a structured documentation of the project.

---

## Database Models

### Product Model
- **Fields**:
  - `id`: Integer, primary key.
  - `name`: String, maximum 30 characters, mandatory.
  - `quantity_in_stock`: Integer, defaults to 0.
  - `quantity_sold`: Integer, defaults to 0.
  - `unit_price`: Integer, defaults to 0.
  - `revenue`: Integer, defaults to 0.
  - `supplied_by`: Foreign key referencing the `Supplier` model.

### Supplier Model
- **Fields**:
  - `id`: Integer, primary key.
  - `name`: String, maximum 30 characters.
  - `company`: String, maximum 30 characters.
  - `email`: String, maximum 100 characters.
  - `phone`: String, maximum 15 characters.

---

## Backend Endpoints

### Supplier Endpoints
1. **Add Supplier** (`POST /supplier`)
   - **Description**: Adds a new supplier.
   - **Input**: Supplier details (name, company, email, phone).
   - **Output**: Supplier data.

2. **Retrieve All Suppliers** (`GET /supplier`)
   - **Description**: Retrieves all suppliers.
   - **Output**: List of all supplier records.

3. **Retrieve Specific Supplier** (`GET /supplier/{supplier_id}`)
   - **Description**: Retrieves details of a specific supplier by ID.
   - **Input**: Supplier ID.
   - **Output**: Supplier details.

4. **Update Supplier** (`PUT /supplier/{supplier_id}`)
   - **Description**: Updates supplier details.
   - **Input**: Supplier ID and updated information.
   - **Output**: Updated supplier data.

5. **Delete Supplier** (`DELETE /supplier/{supplier_id}`)
   - **Description**: Deletes a supplier record by ID.
   - **Input**: Supplier ID.

### Product Endpoints
1. **Add Product** (`POST /product/{supplier_id}`)
   - **Description**: Adds a new product associated with a supplier.
   - **Input**: Supplier ID and product details (name, quantity, unit price, etc.).
   - **Output**: Product data.

2. **Retrieve All Products** (`GET /product`)
   - **Description**: Retrieves all products.
   - **Output**: List of all product records.

3. **Retrieve Specific Product** (`GET /product/{id}`)
   - **Description**: Retrieves details of a specific product by ID.
   - **Input**: Product ID.
   - **Output**: Product details.

4. **Update Product** (`PUT /product/{id}`)
   - **Description**: Updates product details.
   - **Input**: Product ID and updated information.
   - **Output**: Updated product data.

5. **Delete Product** (`DELETE /product/{id}`)
   - **Description**: Deletes a product record by ID.
   - **Input**: Product ID.

### Email Notification Endpoint
1. **Send Email to Supplier** (`POST /email/{product_id}`)
   - **Description**: Sends an email to the supplier of a specific product.
   - **Input**: Product ID, email content (message and subject).
   - **Output**: Status of email delivery.

---

## Additional Functionalities

### Email Notifications
- **Purpose**: Notify suppliers about specific products or updates.
- **Library Used**: `fastapi-mail`
- **Email Configuration**:
  - SMTP Server: Gmail (`smtp.gmail.com`)
  - Port: 465
  - Authentication: Enabled (credentials loaded from `.env` file).

### Pydantic Models
- **Purpose**: Schema validation and serialization of data.
- **Models Created**:
  - `product_pydantic`
  - `product_pydanticIn`
  - `supplier_pydantic`
  - `supplier_pydanticIn`

### Environment Variables
- **Stored in**: `.env`
- **Keys**:
  - `EMAIL`: Sender email address.
  - `PASSWORD`: Sender email password.

---

## Setup and Deployment

### Backend Setup
1. Install dependencies:
   ```bash
   pip install fastapi tortoise-orm fastapi-mail pydantic python-dotenv
   ```
2. Initialize database:
   - SQLite database (`database.sqlite3`) is automatically initialized using Tortoise ORM.

### Run the Application
- Start the server:
  ```bash
  uvicorn app:app --reload
  ```
- API documentation available at `/docs`.

### Deployment
- Ensure the `.env` file is properly configured with email credentials.
- Use a production-ready web server for deployment (e.g., Gunicorn, Uvicorn with ASGI server).

---

## Future Enhancements
1. Integrate frontend with the backend.
2. Add authentication and authorization.
3. Implement advanced analytics and reporting for inventory.
4. Optimize database performance for large-scale operations.
5. Automate email scheduling for regular notifications.

---

## Notes
- The project is in the development stage. Frontend integration and additional features are planned for future iterations.
- All database schemas and endpoints are tested and functional.

