# Blogging Backend

This is the backend for a personal blogging application built with Node.js, Express, TypeScript, and PostgreSQL.
Hosted Backend: https://blog-be-g7o8.onrender.com
---

## 🚀 Features

- User authentication (signup & login) with JWT (stored in cookies)
- Secure password hashing with bcrypt
- Create and fetch blog posts (protected routes)
- Fetch posts by author or by post ID
- Environment variable support via `.env`
- PostgreSQL database integration
- Modular code structure with controllers, middleware, and routes

---

## 🏗️ Project Structure

```
Backend/
├── src/
│   ├── controllers/      # Route handlers (auth, posts)
│   ├── middleware/       # Authentication middleware (JWT, cookies)
│   ├── routes/           # Express route definitions
│   ├── db.ts             # Database connection
│   └── index.ts          # App entry point
├── dist/                 # Compiled JavaScript output
├── .env                  # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mrdynamic-soni/blog-be.git
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
     PORT=8080
     JWT_SECRET=your_jwt_secret
     DATABASE_URL=your_postgres_connection_string
     NODE_ENV=production
     ```

4. **Run database migrations** (if any).

5. **Build the project:**
   ```sh
   npm run build
   ```

6. **Start the production server:**
   ```sh
   npm start
   ```

   For development with hot-reload:
   ```sh
   npm run dev
   ```

---

## 📚 API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive a JWT (in cookies)
- `GET /auth/me` — Validate JWT from cookies and get user info

### Posts

- `POST /posts/post` — Create a new post (requires authentication)
- `GET /posts/posts` — Get all posts
  - `GET /posts/posts?author=<author_id>` — Get all posts by a specific author
  - `GET /posts/posts?postid=<post_id>` — Get a specific post by its ID

---

## 💡 Development Choices

- **TypeScript** for type safety and maintainability.
- **JWT in HTTP-only cookies** for secure authentication.
- **PostgreSQL** as the relational database.
- **Express** for routing and middleware.
- **Error handling** for async routes using `Promise.resolve(...).catch(next)` pattern.
- **Environment variables** for secrets and configuration.
- **ESM modules** (`"type": "module"` in `package.json`) for modern import/export syntax.

---

## 🛠️ Useful Commands

- Start development server:  
  ```sh
  npm run dev
  ```
- Build TypeScript:  
  ```sh
  npm run build
  ```
- Start production server:  
  ```sh
  npm start
  ```
- Install dependencies:  
  ```sh
  npm install
  ```

---

## ⚠️ Security Note

**Do not commit your `.env` file or secrets to version control.**  
Your `.env` is already included in `.gitignore` by default.

