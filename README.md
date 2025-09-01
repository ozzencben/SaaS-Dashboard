# Portfolio Admin Dashboard Project

**Author:** Özenç Dönmezer  
📧 ozzencben@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/%C3%B6zen%C3%A7-d%C3%B6nmezer-769125357/)

---

## Project Overview

This is a **portfolio-ready admin dashboard project** built with **React**.  
It is designed as a **black & white themed, responsive dashboard** that showcases typical admin functionalities such as users, products, orders, and analytics.

> ⚠️ This project is a **draft/learning project**. Auth & role management features are partially implemented and can be further developed for production use.

---

## Features

### Dashboard
- Overview cards for:
  - Total Products
  - Total Users
  - Total Orders
  - Highest Product Price
- Simple and clean black & white theme
- Responsive layout for desktop, tablet, and mobile
- Quick links to Users, Products, Orders pages

### Analytics
- Product category distribution chart
- Responsive chart container using **Recharts**
- Dynamic data from **FakeStoreAPI**

### Users
- List of users with pagination
- Search by name or email
- Filter by role (User/Admin)
- Edit roles (front-end only)
- Delete users (front-end only)

### Products
- List all products from **FakeStoreAPI**
- Display product title, category, price, and rating

### Orders
- List of all orders (carts) from **FakeStoreAPI**
- Displays cart details dynamically

### Authentication & Roles (Development Stage)
- Role-based access control planned (currently front-end simulation)
- Auth and JWT implementation placeholders exist for learning purposes
- Can be extended to full backend auth with Node.js, Express, and MongoDB

---

## Tech Stack

- **React** – Functional components, Hooks (useState, useEffect)
- **React Router** – Page navigation
- **Recharts** – Charts and analytics
- **React Icons** – Dashboard icons
- **CSS** – Custom styling, black & white theme
- **FakeStoreAPI** – Simulated backend data for users, products, and orders
- **Node.js + Express** – Backend (can be expanded for full auth)

---

## Project Structure

```
frontend-saas/
 ├─ src/
 │   ├─ components/
 │   │   ├─ Dashboard/
 │   │   ├─ Analytics/
 │   │   ├─ Users/
 │   │   ├─ Products/
 │   │   └─ Orders/
 │   ├─ services/
 │   │   └─ FakeStoreServices.js
 │   ├─ App.jsx
 │   └─ index.jsx
backend-saas/
 ├─ server.js
 └─ routes/
     └─ auth, users, products, orders (optional)
```

---

## Setup

### Backend
```bash
cd backend-saas
npm install
npm run dev
```

### Frontend
```bash
cd frontend-saas
npm install
npm run dev
```

The app will run on `http://localhost:3000` (frontend).

---

## Development Notes

- **Auth & Role Management:**  
  - Front-end simulation of role-based features implemented in Users page.
  - Backend integration (Node.js + Express + MongoDB) can be added later.

- **Responsive Design:**  
  - Fully responsive for desktop, tablet, and mobile.
  - Dashboard cards and charts scale appropriately without stretching across wide screens.

- **Data Source:**  
  - Using FakeStoreAPI to simulate products, users, and orders.
  - Can be replaced with a real backend API.

- **Future Improvements:**  
  - Full JWT authentication and backend role verification
  - CRUD operations connected to a real database
  - Enhanced analytics with multiple chart types
  - Dark/Light theme toggle

---

## Contact

- Email: ozzencben@gmail.com  
- LinkedIn: [Özenç Dönmezer](https://www.linkedin.com/in/%C3%B6zen%C3%A7-d%C3%B6nmezer-769125357/)
