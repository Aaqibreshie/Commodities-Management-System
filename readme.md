# Commodities Management System

A full-stack role-based commodity management application built with modern technologies.

## Tech Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Backend  | NestJS, GraphQL, Prisma, SQLite                  |
| Frontend | Next.js, TypeScript, Tailwind CSS, Apollo Client |
| Auth     | JWT-based Role-Based Access Control (RBAC)       |

## Features

- ✅ **Authentication** - Login with email & password (5 pts)
- ✅ **Dashboard** - Manager-only statistics view (30 pts)
- ✅ **View Products** - Product listing with search/filter (10 pts)
- ✅ **Add/Edit Products** - CRUD operations (15 pts)
- ✅ **Light/Dark Mode** - Theme switching with persistence (15 pts)
- ✅ **Role-Based Menu** - Dynamic UI based on user role (25 pts bonus)

## Role-Based Access

| Feature           | Manager | Store Keeper |
| ----------------- | :-----: | :----------: |
| Login             |   ✅    |      ✅      |
| Dashboard         |   ✅    |      ❌      |
| View Products     |   ✅    |      ✅      |
| Add/Edit Products |   ✅    |      ✅      |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Access

- Frontend: http://localhost:3000
- Backend GraphQL: http://localhost:4000/graphql

## Demo Credentials

| Role         | Email            | Password    |
| ------------ | ---------------- | ----------- |
| Manager      | manager@test.com | password123 |
| Store Keeper | keeper@test.com  | password123 |

## Project Structure

```
Assessment/
├── backend/                 # NestJS + GraphQL + Prisma
│   ├── prisma/              # Database schema & seed
│   └── src/
│       ├── auth/            # Authentication module
│       ├── products/        # Products CRUD
│       ├── dashboard/       # Statistics (Manager only)
│       └── common/          # Guards & decorators
│
└── frontend/                # Next.js + TypeScript + Tailwind
    └── src/
        ├── app/             # Pages (login, dashboard, products)
        ├── components/      # Navbar, ProtectedLayout
        ├── context/         # Auth & Theme contexts
        └── lib/             # Apollo client
```

## Screenshots

### Login Page

Premium login with demo credentials display and theme toggle.

### Dashboard (Manager Only)

Statistics cards showing total products, quantity, value, and low stock alerts with category breakdown.

### Products List

Searchable, filterable product table with edit/delete actions.

## Author

Built for assessment purposes.
