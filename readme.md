# 📦 Commodities Management System

A role-based Commodities Management System built as a frontend take-home challenge for Slooze, designed to simulate real-world supply chain workflows. The application demonstrates authentication, role-based access control (RBAC), protected routing, and dynamic UI restrictions using modern web technologies.

The system supports two roles—**Manager** and **Store Keeper**—with clearly defined permissions. Managers can access an operational dashboard and manage commodities, while Store Keepers can view and update product inventory. The application also includes UI enhancements such as Light/Dark mode and role-aware navigation.

This project focuses on clean architecture, scalability, and practical RBAC implementation, reflecting how such systems are built in early-stage, production-grade environments.

---

## 🚀 Features

- ✅ Email & password authentication (mocked)
- ✅ Role-Based Access Control (Manager / Store Keeper)
- ✅ Protected routes and role guards
- ✅ Manager-only dashboard with commodity insights
- ✅ View, add, and edit commodities
- ✅ Role-based UI and menu restrictions
- ✅ Light/Dark theme with persistence
- ✅ Responsive UI using Tailwind CSS

---

## 🛠 Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Frontend     | Next.js, TypeScript, Tailwind CSS |
| State & Data | Apollo Client, GraphQL (mocked)   |
| Auth         | Role-Based Access Control (RBAC)  |
| Styling      | Tailwind CSS with Dark Mode       |

---

## 🧠 Assumptions

- Backend APIs are mocked for demonstration purposes.
- Authentication is simulated using sample credentials.
- Role enforcement is handled at both routing and UI levels.
- Sample data is used to represent realistic commodity inventory.

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🔐 Sample Credentials

| Role             | Email            | Password    |
| ---------------- | ---------------- | ----------- |
| **Manager**      | manager@test.com | password123 |
| **Store Keeper** | keeper@test.com  | password123 |
