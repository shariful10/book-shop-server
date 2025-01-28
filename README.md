# Book Shop Server

## Live URL

- Live URL
  The API is deployed and can be accessed at: https://book-shop-apis.vercel.app

## Overview

Book Shop Server is a RESTful API built with Node.js, Express.js, Mongoose, and TypeScript. It provides functionalities to manage books and orders in a book shop, including creating, updating, deleting books, placing orders, and calculating total revenue from orders. The project also uses Zod for validation.

## Technologies

- Node.js
- Express.js
- Mongoose
- TypeScript
- Zod validation library

## Features

- **Auth APIs**

  - Login user

- **User Management APIs**

  - Create user

- **Books Management APIs**

  - Create a book
  - Get all books
  - Get a specific book by ID
  - Update a book by ID
  - Delete a book by ID

- **Orders Management APIs**
  - Create an order
  - Calculate total revenue from orders

## Setup Instructions

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shariful10/book-shop.git
   ```

2. **Install node modules**

- To install the necessary dependencies, run the following command:

  ```bash
  npm install
  ```

3. **Run the project**

   ```bash
   npm run start:dev
   ```
