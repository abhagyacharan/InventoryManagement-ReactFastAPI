from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from models import (supplier_pydantic, supplier_pydanticIn, Supplier)
from models import (product_pydantic, product_pydanticIn, Product)

#email
from fastapi import FastAPI, BackgroundTasks, UploadFile, File, Form
from starlette.responses import JSONResponse
from starlette.requests import Request
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import BaseModel, EmailStr
from typing import ContextManager, List

#dotenv
from dotenv import dotenv_values

#credentials
credentials = dotenv_values(".env")

#adding CORs headers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#adding cors urls
origins = [
    "http://127.0.0.1:3000",  # Localhost for React
    "http://localhost:3000",   # Adding this as well in case of different behavior on different systems
]

# Add CORS middleware to allow access from the specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def hello():
    return {"Message":"go to /docs for APU documentation"}

@app.post('/supplier')
async def add_supplier(supplier_info: supplier_pydanticIn):
    supplier_obj = await Supplier.create(**supplier_info.dict(exclude_unset=True))
    response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {"status" : "ok", "data" : response}

@app.get('/supplier')
async def get_all_suppliers():
    response = await supplier_pydantic.from_queryset(Supplier.all())
    return {"status" : "ok", "data" : response}

@app.get('/supplier/{supplier_id}')
async def get_specific_supplier(supplier_id: int):
    response = await supplier_pydantic.from_queryset_single(Supplier.get(id = supplier_id))
    return {"status" : "ok", "data" : response} 

@app.put('/supplier/{supplier_id}')
async def update_supplier(supplier_id: int, update_info: supplier_pydanticIn):
    supplier = await Supplier.get(id = supplier_id)
    update_info = update_info.dict(exclude_unset=True)
    supplier.name = update_info['name']
    supplier.company = update_info['company']
    supplier.email = update_info['email']
    supplier.phone = update_info['phone']
    await supplier.save()
    response = await supplier_pydantic.from_tortoise_orm(supplier)
    return {"status" : "ok", "data" : response}

@app.delete('/supplier/{supplier_id}')
async def delete_supplier(supplier_id: int):
    supplier = await Supplier.get_or_none(id=supplier_id)
    if not supplier:
        return {"status": "error", "message": "Supplier not found"}
    await supplier.delete()
    return {"status": "ok"}

@app.post('/product/{supplier_id}')
async def add_product(supplier_id: int, product_details: product_pydanticIn):
    supplier = await Supplier.get(id = supplier_id)
    product_details = product_details.dict(exclude_unset=True)
    product_details['revenue'] += product_details['quantity_sold'] * product_details['unit_price']
    product_obj = await Product.create(**product_details, supplied_by = supplier)
    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status" : "ok", "data" : response}

@app.get('/product')
async def get_all_products():
    try:
        response = await product_pydantic.from_queryset(Product.all())
        return {"status": "ok", "data": response}
    except Exception as e:
        print(f"Error: {e}")
        return {"status": "error", "message": str(e)}

@app.get('/product/{id}')
async def get_specific_product(id: int):
    response = await product_pydanticIn.from_queryset_single(Product.get(id = id))
    return {"status" : "ok", "data" : response} 

@app.put('/product/{id}')
async def update_product(id: int, update_info: product_pydanticIn):
    product = await Product.get(id = id)
    update_info = update_info.dict(exclude_unset=True)
    product.name = update_info['name']
    product.quantity_in_stock = (update_info['quantity_in_stock'])
    product.quantity_sold += update_info['quantity_sold']
    product.unit_price = update_info['unit_price']
    product.revenue += (update_info['quantity_sold'] * update_info['unit_price']) + update_info['revenue']
    await product.save()
    response = await product_pydantic.from_tortoise_orm(product)
    return {"status" : "ok", "data" : response} 


@app.delete('/product/{id}')
async def delete_product(id: int):
    await Product.filter(id = id).delete()
    return {"status" : "ok"}



class EmailSchema(BaseModel):
    email: List[EmailStr]

class EmailContent(BaseModel):
    message: str
    subject: str

conf = ConnectionConfig(
    MAIL_USERNAME = credentials['EMAIL'],
    MAIL_PASSWORD = credentials['PASSWORD'],
    MAIL_FROM = credentials['EMAIL'],
    MAIL_PORT = 465,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

@app.post('/email/{product_id}')
async def send_email(product_id: int, content: EmailContent):
    product = await Product.get(id = product_id)
    supplier = await product.supplied_by
    supplier_email = [supplier.email]

    html = f"""
    <h5>Grog's Business LTD</h5> 
    <br>
    <p>{content.message}</p>
    <br>
    <h6>Thank You.</h6>
    """

    message = MessageSchema(
    subject=content.subject,
    recipients=supplier_email,
    body=html,
    subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"status" : "ok"}

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"models" : ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)