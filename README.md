# Turbo Course Selling Project

## Description

This project is a full-stack application built using a Turbo monorepo structure. It includes a frontend for end users to purchase and view courses, an admin panel for course creators to manage their content, and a backend API server. The database is managed using PostgreSQL.

## Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4FC08D?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

## Installation

Follow these steps to set up the project locally:
Fork the Repo and clone it

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Venomhare/course-selling-app
   ```

   OR

   ```bash
   git clone https://github.com/{YOUR_USERNAME}/course-selling-app
   ```

2. **Install Dependencies**
   Navigate to the project directory and run:

   ```bash
   pnpm install
   ```

3. **Database Setup**
   Create a PostgreSQL database and update the environment variables:

   ```bash
   # In packages/db/.env
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
   ```

   Run database migrations:

   ```bash
   pnpm --filter @repo/db db:migrate
   ```

4. **Environment Setup**
   Create environment files for each app:

   ```bash
   # In apps/server/.env
   JWT_SECRET="your-jwt-secret"
   ADMIN_JWT_SECRET="your-admin-jwt-secret"

   # In apps/web/.env
   VITE_API_URL="http://localhost:3010"

   # In apps/admin/.env
   VITE_API_URL="http://localhost:3010/admin"
   ```

5. **Start Development Servers**
   Start all services in development mode:

   ```bash
   pnpm dev
   ```

   Or start individual services:

   ```bash
   # Start backend
   pnpm --filter @repo/server dev

   # Start web frontend
   pnpm --filter @repo/web dev

   # Start admin frontend
   pnpm --filter @repo/admin dev
   ```

## Docs

For detailed documentation on how to use the project, please refer to the [Documentation](./docs/app/getting-started/page.tsx).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License 
