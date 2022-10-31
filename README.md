# Storefront Backend Project

## Getting Started

Step 1
`npm i` for install dependencies
`npm i --save-dev` for install dev dependencies

Step 2
Connect to psql to create db
`psql -h 127.0.0.1 -U postgres` (password is your password you input when install postgres SQL)

Step 3
Create 2 db
`CREATE DATABASE udacity_fs_store;` and `CREATE DATABASE udacity_fs_store_test;`

Optional: Run test (Please run test before start app if needed)
`npm run test`

Step 4
Run app
`npm start`
=> On your browser, navigate to url `http://localhost:3000/products/popular` or `http://localhost:3000/products` and you can see data come from system

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
