# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

##### Map of endpoints for Products
required
[C] /products      POST  [token required]
[R] /products      GET
    /products/:id  GET
[U] N/A
[D] N/A

optional
[R] /products/most-popular  GET
    /products               GET (args: category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

##### Map of endpoints for Users
required
[C] /users        POST  [token required]
[R] /users        GET   [token required]
    /users/:id    GET   [token required]
[U] N/A
[D] N/A

optional
[R] /users/login  POST   (args: user_id, password)

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

##### Map of endpoints for Orders
required
[C] /orders      POST  (args: user_id)   [token required]
[R] /orders      GET   (args: user_id)   [token required]
    /orders/:id  GET   (args: user_id)   [token required]
[U] /orders/:id  PUT   (args: user_id)   [token required]
[D] N/A

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

