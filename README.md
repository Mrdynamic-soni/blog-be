# Blogging Backend

This is the backend for a personal blogging application built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- User authentication (signup & login) with JWT
- Secure password hashing with bcrypt
- Create and fetch blog posts (protected routes)
- Environment variable support via `.env`
- PostgreSQL database integration

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mrdynamic-soni/blogging-be.git
   cd Backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your environment variables:**
   - Create a `.env` file in the root directory.
   - Add your PostgreSQL connection string and JWT secret:
     ```
     DATABASE_URL=your_postgres_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run database migrations** (if any).

5. **Start the development server:**
   ```sh
   npm run dev
   ```

## Scripts

- `npm run dev` — Start the server in development mode with hot reload.

## Project Structure

```
src/
  controllers/      # Route handlers (auth, posts)
  middleware/       # Authentication middleware
  routes/           # Express route definitions
  utils/            # Utility functions (JWT, etc.)
  db.ts             # Database connection
  index.ts          # App entry point
```

## API Endpoints

### Auth

- `POST /signup` — Register a new user
- `POST /login` — Login and receive a JWT

### Posts

- `POST /post` — Create a new post (requires authentication)
- `GET /posts` — Get all posts

## License

ISC

---
**Note:**  
Do not commit your `.env` file or secrets to version control.