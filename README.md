User-Product API


API to authenticate and authorize users, store and return user data(using MongoDB), store product data using .csv file and return product data

Routes:

Get all user data : (need JWT authentication)
GET http://localhost:3000/api/users/

Get user data by username : (need JWT authentication)
GET http://localhost:3000/api/users/<Username>

Signup : (returns JWT signed token)
POST http://localhost:3000/api/users/signup

Login : (returns JWT signed token)
POST http://localhost:3000/api/users/login

GET all product data : (need JWT authentication)
GET http://localhost:3000/api/products/

Upload .csv to populate product collection (MongoDB) : (need JWT authentication)
POST http://127.0.0.1:3000/api/products/
(with key="uploaded_file" in body)

