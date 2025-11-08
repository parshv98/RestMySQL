# RestMySQL

RestMySQL is a beginner-friendly RESTful API project built with Express.js and MySQL. You can use it to manage user data via full CRUD operations. The API uses password validation, UUID-based IDs, EJS templates for UI, Faker.js for sample user data, and Method-Override to allow PATCH and DELETE requests in HTML forms.

This README walks you through setup and usage step-by-step. No prior backend experience required!

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Sample Data (Faker.js)](#sample-data-fakerjs)
- [API Usage (with Examples)](#api-usage-with-examples)
- [EJS Template UI](#ejs-template-ui)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Full CRUD (Create, Read, Update, Delete) operations for user data
- Password validation
- UUID-based user IDs for security and uniqueness
- EJS templates for simple web pages
- Faker.js integration for generating sample users
- Method-Override for PATCH/DELETE support in forms

---

## Technologies Used

- **JavaScript** (Express.js for server, 63.3%)
- **EJS** (for views, 36.7%)
- **MySQL** (database)
- **Faker.js** (sample data)
- **Method-Override** (for extended HTTP methods support)

---

## Prerequisites

- [Node.js & npm](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/) server running locally or remotely

---

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parshv98/RestMySQL.git
   cd RestMySQL
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Configuration

Create a `.env` file in the project root using this template (update with your MySQL credentials):

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=restmysql
```

You can copy example values from `.env.example` if present.

---

## Database Setup

1. **Create the database:**
   - Log in to MySQL using a client (`mysql` or MySQL Workbench).
   - Run:
     ```sql
     CREATE DATABASE restmysql;
     ```

2. **Create the `users` table:**
   ```sql
   CREATE TABLE users (
     id VARCHAR(36) PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

---

## Running the Project

To start the API/web server:

```bash
npm start
```

Or for development (restart on code changes):

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser (unless you set a different port).

---

## Sample Data (Faker.js)

If you want to populate the database with sample users, use any provided seed script like:

```bash
npm run seed
```
Or follow provided instructions in the repo for testing with Faker.js-generated data.

---

## API Usage (with Examples)

1. **List users**
   ```bash
   curl http://localhost:3000/users
   ```

2. **Create a new user**
   ```bash
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@example.com","password":"SafePass123"}'
   ```

3. **Show user details**
   ```bash
   curl http://localhost:3000/users/{user_id}
   ```

4. **Update a user**
   ```bash
   curl -X PATCH http://localhost:3000/users/{user_id} \
     -H "Content-Type: application/json" \
     -d '{"name":"Bob"}'
   ```

5. **Delete a user**
   ```bash
   curl -X DELETE http://localhost:3000/users/{user_id}
   ```

**Note:** PATCH and DELETE are supported via form submissions (from EJS pages) using Method-Override.

---

## EJS Template UI

Basic web pages are provided for viewing and editing users through forms:
- `GET /` or `GET /users` — See user list
- `GET /users/new` — Create user form
- `GET /users/{id}/edit` — Edit user form

---

## Troubleshooting

- **Cannot connect to database:**  
  Make sure your MySQL server is running and credentials in `.env` are correct.
- **Port already in use:**  
  Change `PORT` in `.env`.
- **Duplicate email error:**  
  Email addresses must be unique in the `users` table.

If you get an error, read the terminal output for guidance; it often tells what went wrong in plain English.

---

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request with a clear summary.

---

## License

Check the repository for `LICENSE` file. Commonly MIT, but confirm in this repo.

---

**Need extra help?**  
If anything feels confusing, open an Issue or ask for help in Discussions!
