# Storefront Backend Project

## Getting Started

### .env
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=udacity_fs_store
POSTGRES_DB_TEST=udacity_fs_store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
ENV=dev
BCRYPT_PASSWORD=encrypt-password
SALT_ROUNDS=10
TOKEN_SECRET=token-secret
PORT=3000
```

Step 1  
`npm i` for install dependencies  
`npm i --save-dev` for install dev dependencies

Step 2  
Connect to psql to create db  
`psql -h 127.0.0.1 -U postgres` (password is your password you input when install postgres SQL)

Step 3  
Create 2 db  
`CREATE DATABASE udacity_fs_store;` and `CREATE DATABASE udacity_fs_store_test;`

Optional: Run test (Please run test before start app if needed, test db `udacity_fs_store_test` should be create before each run of test)  
`npm run test`

Step 4
Run app  
`npm start`  
=> On your browser, navigate to url `http://localhost:3000/products/popular` or `http://localhost:3000/products` and you can see data come from system

### **Database and Backend ports**
DB: 127.0.0.1:5432  
BE: http://localhost:3000

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
