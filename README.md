# Bitmize – Secure, Fast & Customizable URL Shortener  

Bitmize is a **secure, fast, and customizable URL shortener** built using the **MERN stack** (MongoDB, Express, React, Node.js) with **TanStack Query** for efficient frontend data fetching.  
It not only shortens long URLs but also empowers users to create **custom links**, manage them through a **dashboard**, and track analytics — all with **authentication support**.  

---

## ✨ Features  

- 🔐 **Authentication** – Secure login and registration with JWT-based sessions  
- 🎨 **Custom URLs** – Create and manage vanity slugs (e.g., `bitmize.io/my-link`)  
- 📊 **Dashboard** – Track clicks, referrers, and analytics from a clean UI  
- 🚦 **Rate Limiting** – Protects the system from spam/abuse  
- 📱 **Responsive UI** – Mobile-first, built with Tailwind CSS  
- ⚡ **Blazing Fast UX** – Powered by **TanStack Query** caching and revalidation  

---

## 🏗️ Tech Stack  

- **Frontend**: React + Vite, TanStack Query, React Router, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Auth**: JWT (Access & Refresh tokens)  

---

## 🔑 Prerequisites  

Before running Bitmize, ensure you have installed:  

- [Node.js](https://nodejs.org/) (>= 18.x recommended)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- [MongoDB](https://www.mongodb.com/) (local or cloud like Atlas)  
- [Docker](https://www.docker.com/) (optional, for containerized setup)  

---

## ⚡ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-org/bitmize.git
cd bitmize

2️⃣ Install Dependencies

Backend
cd apps/backend
npm run dev

Frontend
cd apps/frontend
npm run dev

Configure Environment Variables
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/bitmize
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
FRONTEND_URL=http://localhost:5173


🐳 Docker Setup
docker compose up --build

📜 License

Bitmize is open-source under the MIT License.





