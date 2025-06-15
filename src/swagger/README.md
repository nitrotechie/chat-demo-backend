// This file explains all REST API endpoints for ShareHive backend.
// Place this in src/swagger/README.md for quick reference.

# ShareHive API Endpoints

## User
- POST   /users              — Create a new user
- GET    /users/{id}         — Get user by ID
- PUT    /users/{id}         — Update user by ID
- DELETE /users/{id}         — Delete user by ID

## Product
- POST   /products           — Create a new product
- GET    /products           — List all products
- GET    /products/{id}      — Get product by ID
- PUT    /products/{id}      — Update product by ID
- DELETE /products/{id}      — Delete product by ID

## Product Request
- POST   /product-request            — Request a product
- POST   /product-request/{id}/accept — Accept a product request

## Real-time (Socket.IO)
- connect (with JWT)
- chat:list
- chat:create
- message:send
- message:receive
- message:history

See swagger.yaml for full details and schemas.
